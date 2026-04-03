# Microsoft Security Copilot Snippets

VS Code extension providing code snippets and command-palette templates for **Microsoft Security Copilot** agent, plugin, and OpenAPI manifest development.

## Features

### Snippets (Type & Tab)
Type a short prefix in any `.yaml` file and press `Tab` to expand a full template:

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
| `sc-agent` | Complete agent manifest |
| `sc-interactive-agent` | Interactive (chat) agent |
| `sc-descriptor` | Descriptor block only |
| `sc-agentdef` | AgentDefinitions block |
| `sc-skillgroup-api` | SkillGroup - API format |
| `sc-skillgroup-kql` | SkillGroup - KQL format |
| `sc-skillgroup-gpt` | SkillGroup - GPT format |
| `sc-skillgroup-agent` | SkillGroup - Agent format |
| `sc-input` | Input parameter block |
| `sc-trigger` | Trigger definition |
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
| `sc-ip-reputation` | IP reputation plugin (AbuseIPDB pattern) |
| `sc-email-logicapp` | Email via Logic App |

### Command Palette
Press `Ctrl+Shift+P` and search for **Security Copilot** to find:

- **Security Copilot: Show All Templates** — Quick pick menu with all templates
- **Security Copilot: Insert API Plugin Template**
- **Security Copilot: Insert KQL Plugin Template**
- **Security Copilot: Insert GPT Skill Template**
- **Security Copilot: Insert Agent Manifest Template**
- **Security Copilot: Insert Interactive Agent Template**
- **Security Copilot: Insert Logic App Plugin Template**
- **Security Copilot: Insert OpenAPI Specification Template**

### Right-Click Context Menu
Right-click in any YAML file to access **Security Copilot Templates** submenu.

## Installation

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
This creates a `.vsix` file you can install via `Extensions > Install from VSIX`.

### Publish to Marketplace
1. Create a publisher at https://marketplace.visualstudio.com/manage
2. Update `publisher` in `package.json`
3. Run:
```bash
npx @vscode/vsce publish
```

## Template Structure Reference

Security Copilot manifests use three top-level keys:

- **Descriptor** — Plugin/skillset metadata (Name, DisplayName, Description, Auth)
- **AgentDefinitions** — Agent configuration (Triggers, RequiredSkillsets)
- **SkillGroups** — Tool definitions in formats: `API`, `KQL`, `GPT`, `AGENT`, `LogicApp`

See [Microsoft Security Copilot Developer Docs](https://learn.microsoft.com/en-us/copilot/security/developer/) for full reference.

## License

MIT
