class_name SessionPresentation
extends RefCounted
## Localized read model shared by native and accessible web UI.
## Modelo de lectura localizado para UI nativa y web accesible.

static func view_model(session: Node) -> Dictionary:
	var panel = session.panel
	var feedback = session.feedback
	var quick_id = session.quick_id
	# Expose presentation, never the save or authoritative campaign dictionaries.
	# Publica presentación, nunca el guardado ni los diccionarios autoritativos.
	return {"panel": panel, "feedback": GameState.localized(feedback), "quickId": quick_id,
		"quickDone": session.quick_done(), "world": GameState.current_world, "presentation": presentation(session),
		"storage": SaveManager.restore_status, "saveBlocked": SaveManager.writes_blocked,
		"status": status_text(session)}

static func text(es: String, en: String) -> String:
	return en if GameState.language == "en" else es

static func status_text(session: Node) -> String:
	var rules = session.rules
	var item = rules.progress(session.game())
	var current = rules.mission(session.game())
	var title = GameState.localized(current.get("title", {}))
	if session.quick_done(): title = text("Misión rápida completada", "Quick mission completed")
	return "%s · %s: %s / 100 · %s" % [title, GameState.localized(rules.catalog.quest_copy.energy), item.energy,
		str(item.get("remaining", current.get("seconds", 90))) + "s" if session.game().timed and not current.is_empty() and not session.quick_done() else GameState.localized(rules.catalog.quest_copy.untimed)]

static func presentation(session: Node) -> Dictionary:
	var rules = session.rules
	var feedback = session.feedback
	var panel = session.panel
	var quick_game = session.quick_game
	var selected_side = session.selected_side
	var event_id = session.event_id
	var event_phase = session.event_phase
	var result = {"title": "", "text": "", "choices": [], "feedback": GameState.localized(feedback)}
	var current = rules.mission(session.game())
	var item = rules.progress(session.game())
	var disabled = not GameState.active or item.energy == 0 or (session.game().timed and item.get("remaining", -1) == 0)
	match panel:
		"menu":
			result.title = text("Partida y misiones rápidas", "Game and quick missions")
			result.text = text("Las misiones rápidas tienen progreso independiente. Al terminarlas vuelves a tu campaña.", "Quick missions have independent progress. Ending them returns you to your campaign.")
			if not quick_game.is_empty():
				result.choices.append({"id": "endQuick", "label": text("Volver a mi campaña", "Return to my campaign"), "command": {"type": "endQuick"}, "disabled": not GameState.active})
			else:
				for chapter in rules.catalog.chapters:
					if not SceneManager.WORLDS.has(chapter.id): continue
					for id in chapter.missions:
						result.choices.append({"id": id, "label": text("Practicar: ", "Practice: ") + GameState.localized(rules.missions[id].title), "command": {"type": "startQuick", "id": id, "chapter": chapter.id}, "disabled": not GameState.active})
			result.choices.append({"id": "newGame", "label": text("Nueva campaña…", "New campaign…"), "command": {"type": "confirmNewGame"}, "disabled": not GameState.active})
		"reset":
			result.title = text("¿Empezar una campaña nueva?", "Start a new campaign?")
			result.text = text("Esto sustituirá el guardado nativo. El guardado anterior v1 se conserva.", "This replaces the native save. The previous v1 save is retained.")
			result.choices.append({"id": "confirm", "label": text("Sí, empezar de nuevo", "Yes, start again"), "command": {"type": "newGame"}, "disabled": not GameState.active})
		"mission":
			if current.is_empty(): return result
			result.title = GameState.localized(current.title)
			result.text = GameState.localized(current.briefing) + "\n" + current.get("evidence", "")
			for metric in current.get("metrics", []): result.text += "\n%s: %s%%" % [metric.label, metric.value]
			if current.get("challenge", "") == "snake":
				var snake = item.get("snake", SnakeRules.fresh())
				var cells: Array[int] = []
				cells.resize(64)
				cells.fill(0)
				for point in snake.body: cells[int(point[1]) * 8 + int(point[0])] = 1
				if snake.score < 4:
					var food = SnakeRules.PACKETS[snake.score]
					cells[food.y * 8 + food.x] = 2
				result.board = {"cells": cells, "label": GameState.localized(rules.catalog.quest_copy.snakeBoard) + " · %s/4" % snake.score}
				if snake.failed: result.feedback = GameState.localized(rules.catalog.quest_copy.snakeFail)
				elif snake.score == 4: result.feedback = GameState.localized(rules.catalog.quest_copy.snakeDone)
				for dir in [[0, -1, "Arriba", "Up"], [-1, 0, "Izquierda", "Left"], [0, 1, "Abajo", "Down"], [1, 0, "Derecha", "Right"]]:
					result.choices.append({"id": "snake" + dir[3], "label": text(dir[2], dir[3]), "command": {"type": "snakeStep", "direction": [dir[0], dir[1]]}, "disabled": disabled or snake.failed or snake.score == 4})
				result.choices.append({"id": "snakeRestart", "label": GameState.localized(rules.catalog.quest_copy.snakeRestart), "command": {"type": "snakeRestart"}, "disabled": disabled})
			for choice in current.choices:
				result.choices.append({"id": choice.id, "label": GameState.localized(choice.label), "command": {"type": "answer", "id": choice.id}, "disabled": disabled or choice.id in item.sequence or (current.get("challenge", "") == "snake" and item.get("snake", {}).get("score", 0) != 4)})
			result.choices.append({"id": "timer", "label": GameState.localized(rules.catalog.quest_copy.untimed if session.game().timed else rules.catalog.quest_copy.timer), "command": {"type": "setTimerEnabled", "enabled": not session.game().timed}, "disabled": false})
		"side":
			for side in rules.catalog.side_quests:
				if side.id != selected_side: continue
				result.title = GameState.localized(side.title)
				result.text = GameState.localized(side.briefing)
				for index in side.options.size(): result.choices.append({"id": str(index), "label": GameState.localized(side.options[index]), "command": {"type": "sideAnswer", "index": index}, "disabled": item.energy == 0})
		"event":
			result.title = GameState.localized(rules.catalog.copy.event)
			var descriptions = {"freelance": "call" if event_phase == 0 else "sideFix", "incident": "incident", "friday": "friday", "family": "baby"}
			result.text = GameState.localized(rules.catalog.copy.get(descriptions.get(event_id, "personal"), {}))
			for event in rules.catalog.personal_events:
				if event.id == event_id: result.text = GameState.localized(event.description)
			var actions = {"freelance": ["accept", "acceptAnyway"] if event_phase == 0 else ["fixConfig"], "incident": ["investigate", "delegate", "defer"], "wedding": ["weddingAction"], "emma-born": ["welcomeEmma"], "friday": ["home", "deploy"], "family": ["pause", "delegate"]}
			for id in actions.get(event_id, []): result.choices.append({"id": id, "label": GameState.localized(rules.catalog.copy[id]), "command": {"type": "eventChoice", "id": id}, "disabled": false})
		"info": result.title = GameState.localized(rules.catalog.copy.journal)
	if not panel.is_empty():
		if panel in ["mission", "info"]:
			if item.energy == 0: result.choices.append({"id": "recover", "label": GameState.localized(rules.catalog.quest_copy.rest), "command": {"type": "recoverEnergy"}, "disabled": not GameState.active})
			if item.get("remaining", -1) == 0: result.choices.append({"id": "retry", "label": GameState.localized(rules.catalog.quest_copy.retry), "command": {"type": "retryMission"}, "disabled": not GameState.active})
			if session.quick_done(): result.choices.append({"id": "endQuick", "label": text("Volver a mi campaña", "Return to my campaign"), "command": {"type": "endQuick"}, "disabled": not GameState.active})
		result.choices.append({"id": "close", "label": GameState.localized(rules.catalog.copy.close), "command": {"type": "closePanel"}, "disabled": false})
	return result
