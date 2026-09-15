import type { Localized } from './projects';

// Curated from the supplied OpenAPI 3.0.4 / v1 contract (2026-09-15).
// Only method, relative path, group and bilingual description are published.
// Do not embed servers, external references, examples or runtime configuration.
export interface ApiEndpoint { method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'; path: string; group: string; description: Localized }
export const endpointGroups: { id: string; label: Localized }[] = [
  {
    "id": "Account",
    "label": {
      "es": "Cuenta",
      "en": "Account"
    }
  },
  {
    "id": "Admin",
    "label": {
      "es": "Administración",
      "en": "Administration"
    }
  },
  {
    "id": "Agent",
    "label": {
      "es": "Agente base",
      "en": "Base agent"
    }
  },
  {
    "id": "Auth",
    "label": {
      "es": "Autenticación",
      "en": "Authentication"
    }
  },
  {
    "id": "Characters",
    "label": {
      "es": "Personajes y conversaciones",
      "en": "Characters and conversations"
    }
  },
  {
    "id": "Feature toggles",
    "label": {
      "es": "Configuración de funciones",
      "en": "Feature settings"
    }
  },
  {
    "id": "Jellyfin",
    "label": {
      "es": "Jellyfin",
      "en": "Jellyfin"
    }
  },
  {
    "id": "Media",
    "label": {
      "es": "Catálogo y programación",
      "en": "Catalogue and programming"
    }
  },
  {
    "id": "Memory",
    "label": {
      "es": "Gustos y memoria",
      "en": "Tastes and memory"
    }
  },
  {
    "id": "Personal Lists",
    "label": {
      "es": "Listas personales",
      "en": "Personal lists"
    }
  },
  {
    "id": "Playback",
    "label": {
      "es": "Dispositivos y reproducción",
      "en": "Devices and playback"
    }
  },
  {
    "id": "Ratings",
    "label": {
      "es": "Valoraciones",
      "en": "Ratings"
    }
  },
  {
    "id": "System",
    "label": {
      "es": "Estado del servicio",
      "en": "Service health"
    }
  },
  {
    "id": "Videoclub",
    "label": {
      "es": "Videoclub",
      "en": "Videoclub"
    }
  }
];
export const platform934Endpoints: ApiEndpoint[] = [
  {
    "path": "/api/account/link-jellyfin",
    "method": "POST",
    "group": "Account",
    "description": {
      "es": "Vincula la cuenta autenticada con una cuenta de Jellyfin.",
      "en": "Link the authenticated account to a Jellyfin account."
    }
  },
  {
    "path": "/api/account/jellyfin-status",
    "method": "GET",
    "group": "Account",
    "description": {
      "es": "Consulta si la cuenta tiene una vinculación con Jellyfin.",
      "en": "Check whether the account is linked to Jellyfin."
    }
  },
  {
    "path": "/api/account/agent-settings",
    "method": "GET",
    "group": "Account",
    "description": {
      "es": "Consulta las preferencias del agente y las funciones de la cuenta.",
      "en": "Read the account’s agent preferences and feature settings."
    }
  },
  {
    "path": "/api/account/agent-settings",
    "method": "PUT",
    "group": "Account",
    "description": {
      "es": "Actualiza las preferencias del agente y las funciones de la cuenta.",
      "en": "Update the account’s agent preferences and feature settings."
    }
  },
  {
    "path": "/api/admin/google-users/pending",
    "method": "GET",
    "group": "Admin",
    "description": {
      "es": "Lista las identidades de Google pendientes de vinculación con Jellyfin.",
      "en": "List Google identities awaiting a Jellyfin link."
    }
  },
  {
    "path": "/api/admin/google-users/{userId}/jellyfin/create",
    "method": "POST",
    "group": "Admin",
    "description": {
      "es": "Aprueba una identidad pendiente creando un usuario restringido de Jellyfin.",
      "en": "Approve a pending identity by creating a restricted Jellyfin user."
    }
  },
  {
    "path": "/api/admin/google-users/{userId}/jellyfin/link",
    "method": "POST",
    "group": "Admin",
    "description": {
      "es": "Aprueba una identidad pendiente vinculándola a un usuario existente de Jellyfin.",
      "en": "Approve a pending identity by linking an existing Jellyfin user."
    }
  },
  {
    "path": "/api/admin/google-users/provision",
    "method": "POST",
    "group": "Admin",
    "description": {
      "es": "Registra una identidad de Google o la asigna a un usuario de la plataforma.",
      "en": "Register a Google identity or assign it to a platform user."
    }
  },
  {
    "path": "/api/admin/jellyfin-users/sync",
    "method": "POST",
    "group": "Admin",
    "description": {
      "es": "Sincroniza usuarios de Jellyfin y actualiza altas, reactivaciones y bajas lógicas.",
      "en": "Synchronize Jellyfin users, including additions, reactivations and logical removals."
    }
  },
  {
    "path": "/api/agent/ask",
    "method": "POST",
    "group": "Agent",
    "description": {
      "es": "Envía un mensaje al agente multimedia base; Videoclub ofrece la conversación de producto.",
      "en": "Send a message to the base media agent; Videoclub provides the product conversation."
    }
  },
  {
    "path": "/api/auth/jellyfin",
    "method": "POST",
    "group": "Auth",
    "description": {
      "es": "Inicia sesión o registra al usuario mediante sus credenciales de Jellyfin.",
      "en": "Sign in or register using Jellyfin credentials."
    }
  },
  {
    "path": "/api/auth/google",
    "method": "POST",
    "group": "Auth",
    "description": {
      "es": "Inicia sesión con Google; una identidad sin vincular queda pendiente de aprobación.",
      "en": "Sign in with Google; an unlinked identity awaits approval."
    }
  },
  {
    "path": "/api/auth/me",
    "method": "GET",
    "group": "Auth",
    "description": {
      "es": "Consulta el perfil actual, su condición de administrador y las funciones disponibles.",
      "en": "Read the current profile, administrator status and available features."
    }
  },
  {
    "path": "/api/auth/logout",
    "method": "POST",
    "group": "Auth",
    "description": {
      "es": "Cierra la sesión del navegador eliminando la cookie de autenticación del servidor.",
      "en": "Close the browser session by clearing the server-managed authentication cookie."
    }
  },
  {
    "path": "/api/characters",
    "method": "GET",
    "group": "Characters",
    "description": {
      "es": "Consulta los personajes de Videoclub y el estado persistente de amistad e historia.",
      "en": "Read the Videoclub roster and persistent friendship and lore state."
    }
  },
  {
    "path": "/api/agents/available",
    "method": "GET",
    "group": "Characters",
    "description": {
      "es": "Lista los agentes disponibles e identifica el seleccionado por defecto.",
      "en": "List available agents and identify the current default."
    }
  },
  {
    "path": "/api/characters/preferences",
    "method": "GET",
    "group": "Characters",
    "description": {
      "es": "Consulta las preferencias de personajes del usuario.",
      "en": "Read the user’s character preferences."
    }
  },
  {
    "path": "/api/characters/preferences",
    "method": "PUT",
    "group": "Characters",
    "description": {
      "es": "Actualiza el personaje activo y las preferencias de diálogos e historia.",
      "en": "Update the active character and dialogue and lore preferences."
    }
  },
  {
    "path": "/api/conversations/{conversationId}/agents",
    "method": "GET",
    "group": "Characters",
    "description": {
      "es": "Lista los agentes invitados a una conversación.",
      "en": "List agents invited to a conversation."
    }
  },
  {
    "path": "/api/conversations/{conversationId}/agents",
    "method": "POST",
    "group": "Characters",
    "description": {
      "es": "Invita agentes a una conversación, con un máximo de tres participantes.",
      "en": "Invite agents to a conversation, with at most three participants."
    }
  },
  {
    "path": "/api/conversations/{conversationId}/scene",
    "method": "GET",
    "group": "Characters",
    "description": {
      "es": "Consulta el modo de escena y la memoria ligera de una conversación.",
      "en": "Read a conversation’s scene mode and lightweight memory."
    }
  },
  {
    "path": "/api/conversations/{conversationId}/scene",
    "method": "PUT",
    "group": "Characters",
    "description": {
      "es": "Guarda el modo de escena preferido para una conversación.",
      "en": "Save the preferred scene mode for a conversation."
    }
  },
  {
    "path": "/api/conversations/{conversationId}/agents/default",
    "method": "PUT",
    "group": "Characters",
    "description": {
      "es": "Selecciona un agente invitado como interlocutor por defecto.",
      "en": "Select an invited agent as the default speaker."
    }
  },
  {
    "path": "/api/conversations/{conversationId}/agents/{characterId}",
    "method": "DELETE",
    "group": "Characters",
    "description": {
      "es": "Retira un agente invitado de la conversación.",
      "en": "Remove an invited agent from the conversation."
    }
  },
  {
    "path": "/api/app-capabilities",
    "method": "GET",
    "group": "Feature toggles",
    "description": {
      "es": "Consulta las funciones generales de la aplicación antes de iniciar sesión.",
      "en": "Read general application capabilities before signing in."
    }
  },
  {
    "path": "/api/admin/feature-toggles",
    "method": "GET",
    "group": "Feature toggles",
    "description": {
      "es": "Consulta la configuración administrativa de funciones.",
      "en": "Read the administrative feature configuration."
    }
  },
  {
    "path": "/api/admin/feature-toggles/app/{toggle}",
    "method": "PUT",
    "group": "Feature toggles",
    "description": {
      "es": "Actualiza una función a nivel de aplicación.",
      "en": "Update an application-level feature setting."
    }
  },
  {
    "path": "/api/admin/feature-toggles/users/{jellyfinUserId}/{toggle}",
    "method": "PUT",
    "group": "Feature toggles",
    "description": {
      "es": "Actualiza una función para un usuario concreto de Jellyfin.",
      "en": "Update a feature setting for a specific Jellyfin user."
    }
  },
  {
    "path": "/api/admin/feature-toggles/users/all/{toggle}",
    "method": "PUT",
    "group": "Feature toggles",
    "description": {
      "es": "Actualiza una función para todos los usuarios.",
      "en": "Update a feature setting for all users."
    }
  },
  {
    "path": "/api/admin/feature-toggles/users/{jellyfinUserId}",
    "method": "GET",
    "group": "Feature toggles",
    "description": {
      "es": "Consulta las funciones configuradas para un usuario de Jellyfin.",
      "en": "Read feature settings for a Jellyfin user."
    }
  },
  {
    "path": "/api/jellyfin/system-info",
    "method": "GET",
    "group": "Jellyfin",
    "description": {
      "es": "Consulta información del sistema Jellyfin.",
      "en": "Read Jellyfin system information."
    }
  },
  {
    "path": "/api/media/search",
    "method": "GET",
    "group": "Media",
    "description": {
      "es": "Busca títulos en el catálogo mediante una consulta de texto.",
      "en": "Search catalogue titles with a text query."
    }
  },
  {
    "path": "/api/recommendations",
    "method": "GET",
    "group": "Media",
    "description": {
      "es": "Obtiene recomendaciones personalizadas con señales del usuario y favoritos como alternativa.",
      "en": "Get personalized recommendations from user signals, with favourites as a fallback."
    }
  },
  {
    "path": "/api/categories",
    "method": "GET",
    "group": "Media",
    "description": {
      "es": "Obtiene categorías generadas con IA para títulos no vistos.",
      "en": "Get AI-generated categories for unwatched titles."
    }
  },
  {
    "path": "/api/programming/today",
    "method": "GET",
    "group": "Media",
    "description": {
      "es": "Consulta o genera la programación diaria personalizada de la portada.",
      "en": "Read or generate personalized daily programming for the home page."
    }
  },
  {
    "path": "/api/programming/events",
    "method": "GET",
    "group": "Media",
    "description": {
      "es": "Lista eventos familiares personalizados de programación.",
      "en": "List custom family programming events."
    }
  },
  {
    "path": "/api/programming/events",
    "method": "POST",
    "group": "Media",
    "description": {
      "es": "Crea un evento familiar que puede influir en la programación estacional.",
      "en": "Create a family event that can influence seasonal programming."
    }
  },
  {
    "path": "/api/programming/events/{eventId}",
    "method": "DELETE",
    "group": "Media",
    "description": {
      "es": "Elimina un evento familiar de programación.",
      "en": "Delete a family programming event."
    }
  },
  {
    "path": "/api/taste",
    "method": "GET",
    "group": "Memory",
    "description": {
      "es": "Consulta gustos, señales recientes, preferencias inferidas y memoria de recomendaciones.",
      "en": "Read tastes, recent signals, inferred preferences and recommendation memory."
    }
  },
  {
    "path": "/api/taste",
    "method": "DELETE",
    "group": "Memory",
    "description": {
      "es": "Reinicia el perfil de gustos, las señales guardadas y la memoria de recomendaciones.",
      "en": "Reset the taste profile, saved signals and recommendation memory."
    }
  },
  {
    "path": "/api/taste/feedback",
    "method": "POST",
    "group": "Memory",
    "description": {
      "es": "Registra una opinión explícita sobre un título: gusta, no interesa, visto u otras señales.",
      "en": "Record explicit feedback on a title: liked, not interested, watched or other signals."
    }
  },
  {
    "path": "/api/lists",
    "method": "GET",
    "group": "Personal Lists",
    "description": {
      "es": "Consulta las listas personales.",
      "en": "Read personal lists."
    }
  },
  {
    "path": "/api/lists",
    "method": "POST",
    "group": "Personal Lists",
    "description": {
      "es": "Crea una lista personal.",
      "en": "Create a personal list."
    }
  },
  {
    "path": "/api/lists/{listId}",
    "method": "GET",
    "group": "Personal Lists",
    "description": {
      "es": "Consulta una lista personal concreta.",
      "en": "Read a specific personal list."
    }
  },
  {
    "path": "/api/lists/{listId}",
    "method": "PUT",
    "group": "Personal Lists",
    "description": {
      "es": "Actualiza una lista personal.",
      "en": "Update a personal list."
    }
  },
  {
    "path": "/api/lists/{listId}",
    "method": "DELETE",
    "group": "Personal Lists",
    "description": {
      "es": "Elimina una lista personal.",
      "en": "Delete a personal list."
    }
  },
  {
    "path": "/api/lists/{listId}/items",
    "method": "POST",
    "group": "Personal Lists",
    "description": {
      "es": "Añade un título a una lista personal.",
      "en": "Add a title to a personal list."
    }
  },
  {
    "path": "/api/lists/{listId}/items/{itemId}",
    "method": "DELETE",
    "group": "Personal Lists",
    "description": {
      "es": "Retira un título de una lista personal.",
      "en": "Remove a title from a personal list."
    }
  },
  {
    "path": "/api/devices/active",
    "method": "GET",
    "group": "Playback",
    "description": {
      "es": "Lista dispositivos activos conectados al canal de comandos de SignalR.",
      "en": "List active devices connected to the SignalR command channel."
    }
  },
  {
    "path": "/api/devices/{deviceId}/commands",
    "method": "POST",
    "group": "Playback",
    "description": {
      "es": "Envía un comando permitido a un dispositivo, como pausar, reanudar o mostrar detalles.",
      "en": "Send an allowed device command, such as pause, resume or show details."
    }
  },
  {
    "path": "/api/playback/notify",
    "method": "POST",
    "group": "Playback",
    "description": {
      "es": "Resuelve un título y un dispositivo y avisa al cliente, que decide cómo reproducirlo.",
      "en": "Resolve a title and device and notify the client, which decides how to play it."
    }
  },
  {
    "path": "/api/ratings",
    "method": "GET",
    "group": "Ratings",
    "description": {
      "es": "Consulta las valoraciones de títulos.",
      "en": "Read title ratings."
    }
  },
  {
    "path": "/api/ratings/{itemId}",
    "method": "PUT",
    "group": "Ratings",
    "description": {
      "es": "Guarda o actualiza la valoración de un título.",
      "en": "Save or update a title rating."
    }
  },
  {
    "path": "/api/ratings/{itemId}",
    "method": "DELETE",
    "group": "Ratings",
    "description": {
      "es": "Elimina la valoración de un título.",
      "en": "Delete a title rating."
    }
  },
  {
    "path": "/health",
    "method": "GET",
    "group": "System",
    "description": {
      "es": "Comprueba el estado básico del servicio.",
      "en": "Check basic service health."
    }
  },
  {
    "path": "/health/ready",
    "method": "GET",
    "group": "System",
    "description": {
      "es": "Comprueba la disponibilidad de las dependencias del servicio.",
      "en": "Check whether service dependencies are ready."
    }
  },
  {
    "path": "/api/videoclub/live/sessions",
    "method": "POST",
    "group": "Videoclub",
    "description": {
      "es": "Crea una sesión breve de Videoclub para conversar con un empleado o debatir entre agentes.",
      "en": "Create a short Videoclub session for employee chat or a debate between agents."
    }
  },
  {
    "path": "/api/videoclub/live/sessions/{sessionId}",
    "method": "GET",
    "group": "Videoclub",
    "description": {
      "es": "Recupera una sesión guardada, sus participantes, historial acotado y preguntas pendientes.",
      "en": "Reload a saved session, its participants, bounded history and pending prompts."
    }
  },
  {
    "path": "/api/videoclub/sessions/{sessionId}/employee",
    "method": "POST",
    "group": "Videoclub",
    "description": {
      "es": "Conversa con el empleado actual, que puede proponer acciones controladas de producto.",
      "en": "Talk to the current employee, who can propose controlled product actions."
    }
  },
  {
    "path": "/api/videoclub/sessions/{sessionId}/floor",
    "method": "POST",
    "group": "Videoclub",
    "description": {
      "es": "Inicia un debate breve entre dos o tres agentes, con memoria de sesión acotada.",
      "en": "Start a short debate between two or three agents with bounded session memory."
    }
  },
  {
    "path": "/api/videoclub/actions",
    "method": "POST",
    "group": "Videoclub",
    "description": {
      "es": "Ejecuta una acción de Videoclub propuesta previamente y devuelve su resultado normalizado.",
      "en": "Execute a previously proposed Videoclub action and return its normalized result."
    }
  }
];
