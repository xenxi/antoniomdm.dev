export default function AntoniosBrand({ className = '' }: { className?: string }) {
  return <span class={`antonios-brand ${className}`.trim()}><span class="antonios-brand-base">Antoñ</span><span class="antonios-brand-accent">iOS</span></span>;
}
