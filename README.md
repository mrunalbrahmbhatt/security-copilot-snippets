# Microsoft Security Copilot Snippets

VS Code extension providing code snippets, file scaffolding, YAML validation, and command-palette templates for **Microsoft Security Copilot** agent, plugin, and OpenAPI manifest development.

## Features

### Snippets (Type & Tab)
Type a short prefix in any `.yaml` file and press `Tab` to expand a full template:

#### Plugin & Agent Manifests
| Prefix | Description |
|---|---|
| `sc-api-plugin` | API plugin manifest |
| `sc-api-plugin-auth` | API plugin with authentication |
| `sc-api-plugin-apikey` | API plugin with API key auth |
| `sc-api-plugin-oauth` | API plugin with OAuth |
| `sc-api-plugin-configurl` | API plugin with configurable endpoint URL |
| `sc-kql-plugin` | KQL plugin (Defender) |
| `sc-kql-sentinel` | KQL plugin (Sentinel) |
| `sc-kql-kusto` | KQL plugin (Kusto cluster) |
| `sc-kql-skill` | Additional KQL skill block |
| `sc-gpt-plugin` | GPT skill |
| `sc-logicapp-plugin` | Logic App plugin |
| `sc-mcp-plugin` | MCP (Model Context Protocol) plugin |
| `sc-agent` | Complete agent manifest |
| `sc-interactive-agent` | Interactive (chat) agent |
| `sc-agent-multitools` | Multi-tool agent (API + KQL + GPT combined) |
| `sc-promptbook` | Promptbook (multi-step GPT sequence) |

#### Building Blocks
| Prefix | Description |
|---|---|
| `sc-descriptor` | Descriptor block only |
| `sc-agentdef` | AgentDefinitions block |
| `sc-skillgroup-api` | SkillGroup - API format |
| `sc-skillgroup-kql` | SkillGroup - KQL format |
| `sc-skillgroup-gpt` | SkillGroup - GPT format |
| `sc-skillgroup-agent` | SkillGroup - Agent format |
| `sc-input` | Input parameter block |
| `sc-trigger` | Trigger definition |

#### OpenAPI Specifications
| Prefix | Description |
|---|---|
| `sc-openapi` | OpenAPI 3.0 spec |
| `sc-openapi-auth` | OpenAPI spec with auth header |
| `sc-openapi-post` | OpenAPI spec with POST body |
| `sc-openapi-geolocation` | OpenAPI IP geolocation sample |
| `sc-openapi-ip-reputation` | OpenAPI IP reputation sample |
| `sc-openapi-logicapp` | OpenAPI Logic App trigger |
| `sc-openapi-path` | Additional OpenAPI path |
| `sc-openapi-schema` | OpenAPI component schema |

### Pre-built Security Queries
| Prefix | Description |
|---|---|
| `sc-kql-risky-signins` | Risky sign-ins summary (Entra ID P2) |
| `sc-kql-impossible-travel` | Impossible travel anomaly detection |
| `sc-kql-logon-profile` | User logon activity profiling |
| `sc-kql-device-detail` | Device sign-in details |
| `sc-kql-signin-geo` | Geo-enriched sign-in records |
| `sc-kql-alert-triage` | Alert triage and investigation |
| `sc-kql-phishing` | Email phishing analysis |
| `sc-kql-ca-failures` | Conditional access failures |
| `sc-kql-mfa-status` | MFA status analysis |
| `sc-ip-reputation` | IP reputation plugin (AbuseIPDB pattern) |
| `sc-email-logicapp` | Email via Logic App |

### Command Palette
Press `Ctrl+Shift+P` and search for **Security Copilot** to find:

- **Security Copilot: Show All Templates** — Quick pick menu with all templates
- **Security Copilot: New Plugin File...** — Create a new file with a selected template
- **Security Copilot: Insert API Plugin Template**
- **Security Copilot: Insert KQL Plugin Template**
- **Security Copilot: Insert GPT Skill Template**
- **Security Copilot: Insert Agent Manifest Template**
- **Security Copilot: Insert Interactive Agent Template**
- **Security Copilot: Insert Logic App Plugin Template**
- **Security Copilot: Insert MCP Plugin Template**
- **Security Copilot: Insert Promptbook Template**
- **Security Copilot: Insert Multi-Tool Agent Template**
- **Security Copilot: Insert OpenAPI Specification Template**

### File Scaffolding
Use **Security Copilot: New Plugin File...** from the Command Palette to create a new properly named `.yaml` file with your chosen template. No need to create a file first — just pick a template and choose where to save.

### YAML Schema Validation
When the [YAML extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) is installed, Security Copilot manifest files get automatic validation:
- Autocomplete for keys like `Format`, `Target`, `SupportedAuthTypes`, `CatalogScope`
- Red squiggles on invalid field names or values
- Auto-applies to files matching `*-plugin.yaml`, `*-agent.yaml`, `manifest.yaml`

### Right-Click Context Menu
Right-click in any YAML file to access the **Security Copilot Templates** submenu with all plugin, agent, and OpenAPI templates.

## Installation

### From VS Code
Search for **Security Copilot Snippets** in the Extensions marketplace, or install from [Open VSX](https://open-vsx.org/extension/mrbrahmbhatt/security-copilot-snippets).

### From VSIX
1. Download the `.vsix` file
2. In VS Code: `Extensions` → `...` → `Install from VSIX`

### From Source
```bash
cd security-copilot-snippets
npm install
npm run compile
```

### Package as VSIX
```bash
npx @vscode/vsce package
```

## Template Structure Reference

Security Copilot manifests use three top-level keys:

- **Descriptor** — Plugin/skillset metadata (Name, DisplayName, Description, Auth)
- **AgentDefinitions** — Agent configuration (Triggers, RequiredSkillsets)
- **SkillGroups** — Tool definitions in formats: `API`, `KQL`, `GPT`, `AGENT`, `LogicApp`, `MCP`

Supported authentication types: `None`, `Basic`, `ApiKey`, `ServiceHttp`, `OAuthAuthorizationCodeFlow`, `OAuthClientCredentialsFlow`, `AAD`, `AADDelegated`

KQL targets: `Defender`, `Sentinel`, `Kusto`

See [Microsoft Security Copilot Developer Docs](https://learn.microsoft.com/en-us/copilot/security/developer/) for full reference.

## License

MIT
