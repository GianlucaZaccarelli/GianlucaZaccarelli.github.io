// Icone devicons (v2.16.0) copiate in public/icons/: niente richieste a CDN terze.
// Icona solo per prodotti/tecnologie reali: associare il logo di un prodotto
// a una competenza concettuale (es. OAuth2 → Vault) è fuorviante.
// Le voci concettuali restano chip di solo testo.
const files: Record<string, string> = {
  'C#': 'csharp-original',
  '.NET': 'dotnetcore-original',
  'OpenAPI/Swagger': 'swagger-original',
  RabbitMQ: 'rabbitmq-original',
  Kafka: 'apachekafka-original',
  'Microsoft SQL Server': 'microsoftsqlserver-plain',
  SQL: 'microsoftsqlserver-plain',
  Docker: 'docker-original',
  Kubernetes: 'kubernetes-plain',
  Git: 'git-original',
  GitHub: 'github-original',
  NuGet: 'nuget-original',
  'GitHub Actions': 'githubactions-original',
  Azure: 'azure-original',
  AWS: 'amazonwebservices-original-wordmark',
  Grafana: 'grafana-original',
  JavaScript: 'javascript-original',
  TypeScript: 'typescript-original',
  HTML5: 'html5-original',
  HTML: 'html5-original',
  CSS3: 'css3-original',
  CSS: 'css3-original',
  Dart: 'dart-original',
  Flutter: 'flutter-original',
  Astro: 'astro-original',
  'Tailwind CSS': 'tailwindcss-original',
  'Visual Studio': 'visualstudio-original',
  'Visual Studio Code': 'vscode-original',
  Playwright: 'playwright-original',
};

export function techIcon(name: string): string | null {
  const file = files[name];
  return file ? `/icons/${file}.svg` : null;
}
