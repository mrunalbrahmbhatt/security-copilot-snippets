import * as vscode from 'vscode';

const templates: Record<string, { label: string; detail: string; content: string }> = {
    apiPlugin: {
        label: 'API Plugin',
        detail: 'Security Copilot API plugin manifest with OpenAPI spec reference',
        content: `Descriptor:
  Name: MyApiPlugin
  DisplayName: My API Plugin
  Description: >
    Description of what this API plugin does.
  CatalogScope: UserWorkspace
  Icon: ""

SkillGroups:
  - Format: API
    Settings:
      OpenApiSpecUrl: "https://example.com/openapi.yaml"
      EndpointUrl: "https://api.example.com"
`
    },
    apiPluginAuth: {
        label: 'API Plugin with Authentication',
        detail: 'API plugin with auth (AAD, ApiKey, OAuth, Basic)',
        content: `Descriptor:
  Name: MyApiPlugin
  DisplayName: My API Plugin
  Description: >
    Description of what this API plugin does.
  CatalogScope: UserWorkspace
  SupportedAuthTypes:
    - AAD
  Authorization:
    Type: AAD
    EntraScopes: https://graph.microsoft.com/.default

SkillGroups:
  - Format: API
    Settings:
      OpenApiSpecUrl: "https://example.com/openapi.yaml"
      EndpointUrl: "https://api.example.com"
`
    },
    kqlDefender: {
        label: 'KQL Plugin (Defender)',
        detail: 'KQL-based plugin targeting Microsoft Defender XDR',
        content: `Descriptor:
  Name: MyKqlPlugin
  DisplayName: My KQL Plugin
  Description: >
    KQL-based plugin for querying Microsoft Defender XDR data.
  CatalogScope: UserWorkspace
  Icon: ""

SkillGroups:
  - Format: KQL
    Skills:
      - Name: MyKqlSkill
        DisplayName: My KQL Skill
        Description: >
          Description of what this KQL skill does.
        Inputs:
          - Name: userUPN
            Description: >
              The User Principal Name of the account to analyze.
            Required: true
            DefaultValue: ""

          - Name: timeframe_days
            Description: >
              Lookback window in days. Default is 7.
            Required: false
            DefaultValue: "7"

        Settings:
          Target: Defender
          Template: |-
            let lookback = {{timeframe_days}}d;
            let upn = tolower("{{userUPN}}");
            EntraIdSignInEvents
            | where Timestamp > ago(lookback)
            | where tolower(AccountUpn) == upn
            | project Timestamp, AccountUpn, IPAddress, Country, City
            | order by Timestamp desc
`
    },
    kqlSentinel: {
        label: 'KQL Plugin (Sentinel)',
        detail: 'KQL-based plugin targeting Microsoft Sentinel',
        content: `Descriptor:
  Name: MySentinelPlugin
  DisplayName: My Sentinel KQL Plugin
  Description: >
    KQL-based plugin for querying Microsoft Sentinel data.
  CatalogScope: UserWorkspace
  Icon: ""

SkillGroups:
  - Format: KQL
    Skills:
      - Name: MySentinelSkill
        DisplayName: My Sentinel Skill
        Description: >
          Description of what this KQL skill does.
        Inputs:
          - Name: paramName
            Description: >
              Parameter description.
            Required: true
            DefaultValue: ""

        Settings:
          Target: Sentinel
          TenantId: '{{TenantId}}'
          SubscriptionId: '{{SubscriptionId}}'
          ResourceGroupName: '{{ResourceGroupName}}'
          WorkspaceName: '{{WorkspaceName}}'
          Template: |-
            SecurityIncident
            | where TimeGenerated > ago(7d)
            | take 100
`
    },
    gptSkill: {
        label: 'GPT Skill',
        detail: 'GPT-based skill for natural language processing',
        content: `Descriptor:
  Name: MyGptPlugin
  DisplayName: My GPT Plugin
  Description: >
    GPT-based skill for natural language processing tasks.
  CatalogScope: UserWorkspace
  Icon: ""

SkillGroups:
  - Format: GPT
    Skills:
      - Name: MyGptSkill
        DisplayName: My GPT Skill
        Description: >
          Description of what this GPT skill does.
        Inputs:
          - Name: UserInput
            Description: The user input to process
            Required: true
        Settings:
          ModelName: gpt-4.1
          Template: |-
            <|im_start|>system
            You are a security analyst assistant. Analyze the provided input and return a structured summary.
            <|im_end|>
            <|im_start|>user
            {{UserInput}}
            <|im_end|>
`
    },
    agentManifest: {
        label: 'Agent Manifest (Full)',
        detail: 'Complete agent with Descriptor, SkillGroups, and AgentDefinitions',
        content: `Descriptor:
  Name: MySecurityAgent
  DisplayName: My Security Agent
  Description: >
    Agent that investigates and automates security workflows.
  CatalogScope: UserWorkspace
  Icon: ""

AgentDefinitions:
  - Name: MyAgentDefinition
    DisplayName: My Security Agent
    Description: >
      Detailed agent description for security analysts.
    Publisher: Custom
    Product: SecurityCopilot
    RequiredSkillsets:
      - MySecurityAgent
    AgentSingleInstanceConstraint: None
    Triggers:
      - Name: Default
        DefaultPeriodSeconds: 300
        FetchSkill: MySecurityAgent.FetchData
        ProcessSkill: MySecurityAgent.AgentEntrypoint

SkillGroups:
  - Format: AGENT
    Skills:
      - Name: AgentEntrypoint
        Description: >
          The entrypoint into the agent.
        Interfaces:
          - Agent
        Inputs:
          - Name: InputParam
            Description: Primary input for the agent
            Required: true
        Settings:
          Model: gpt-4.1
          Instructions: |
            <|im_start|>system
            You are a security investigation agent. Follow these steps:
            1) Analyze the input data
            2) Use available child skills to enrich findings
            3) Produce a summary for the security analyst
            <|im_end|>
            <|im_start|>user
            {{InputParam}}
            <|im_end|>
        ChildSkills:
          - childSkill1
          - childSkill2

  - Format: KQL
    Skills:
      - Name: FetchData
        Description: Fetches data for the agent to process
        Settings:
          Target: Defender
          Template: |-
            // Your fetch KQL query here
            AlertEvidence
            | where Timestamp > ago(5m)
            | take 10
`
    },
    interactiveAgent: {
        label: 'Interactive Agent',
        detail: 'Chat-driven interactive agent manifest',
        content: `Descriptor:
  Name: MyInteractiveAgent
  DisplayName: My Interactive Agent
  Description: >
    Interactive agent for chat-driven security investigations.
  CatalogScope: UserWorkspace
  Icon: ""

AgentDefinitions:
  - Name: MyInteractiveAgentDef
    DisplayName: My Interactive Agent
    Description: Interactive agent for chat-driven experience.
    Publisher: Custom
    Product: SecurityCopilot
    RequiredSkillsets:
      - MyInteractiveAgent
    Triggers:
      - Name: Default
        DefaultPollPeriodSeconds: 0
        ProcessSkill: MyInteractiveAgent.InteractiveEntrypoint
        PromptSkill: MyInteractiveAgent.InteractiveEntrypoint
    AgentSingleInstanceConstraint: None
    PreviewState: Private
    PublisherSource: Custom
    WorkspaceId: default

SkillGroups:
  - Format: Agent
    Skills:
      - Name: InteractiveEntrypoint
        DisplayName: My Interactive Agent
        Description: >
          Interactive chat-driven agent entrypoint.
        Interfaces:
          - InteractiveAgent
        Inputs:
          - Name: UserRequest
            Description: >
              Your investigation request. Include user UPN or relevant details.
            DefaultValue: ""
            Required: true
        SuggestedPrompts:
          - Title: Example Investigation
`
    },
    logicAppPlugin: {
        label: 'Logic App Plugin',
        detail: 'Logic App plugin for Azure workflow integration',
        content: `Descriptor:
  Name: MyLogicAppPlugin
  DisplayName: My Logic App Plugin
  Description: >
    Skills to interact with Azure Logic App.

SkillGroups:
  - Format: LogicApp
    Skills:
      - Name: MyLogicAppSkill
        DisplayName: My Logic App Skill
        Description: Triggers an Azure Logic App workflow
        Inputs:
          - Name: To
            Description: Recipient email address
            Required: true
          - Name: Subject
            Description: Subject line
            Required: true
          - Name: Message
            Description: Body content
            Required: true
        Settings:
          SubscriptionId: your-subscription-id
          ResourceGroup: your-resource-group
          WorkflowName: your-logic-app-name
          TriggerName: manual
`
    },
    openApiSpec: {
        label: 'OpenAPI Specification',
        detail: 'OpenAPI 3.0 spec for Security Copilot API plugin',
        content: `openapi: 3.0.0
info:
  title: My API
  description: API description for Security Copilot integration.
  version: 1.0.0

servers:
  - url: https://api.example.com

paths:
  /endpoint:
    get:
      operationId: MyOperation
      summary: Operation summary
      description: >
        Detailed description of what this operation does.
        #ExamplePrompts Example prompt for Security Copilot
      parameters:
        - name: paramName
          in: query
          required: true
          description: Parameter description
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  result:
                    type: string
`
    },
    openApiSpecPost: {
        label: 'OpenAPI Specification (POST)',
        detail: 'OpenAPI 3.0 spec with POST request body',
        content: `openapi: 3.0.0
info:
  title: My API
  description: API with POST endpoint for Security Copilot.
  version: 1.0.0

servers:
  - url: https://api.example.com

paths:
  /endpoint:
    post:
      operationId: MyPostOperation
      summary: Operation summary
      description: >
        POST endpoint for data retrieval.
        Note: POST is supported only for data retrieval in Security Copilot.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - requiredField
              properties:
                requiredField:
                  type: string
                  description: Required field description
                optionalField:
                  type: string
                  description: Optional field description
      responses:
        '200':
          description: Successful response
        '500':
          description: Error response
`
    }
};

export function activate(context: vscode.ExtensionContext) {
    // Register individual template insertion commands
    const commandMap: Record<string, string> = {
        'securityCopilot.insertApiPlugin': 'apiPlugin',
        'securityCopilot.insertKqlPlugin': 'kqlDefender',
        'securityCopilot.insertGptPlugin': 'gptSkill',
        'securityCopilot.insertAgentManifest': 'agentManifest',
        'securityCopilot.insertLogicAppPlugin': 'logicAppPlugin',
        'securityCopilot.insertInteractiveAgent': 'interactiveAgent',
        'securityCopilot.insertOpenApiSpec': 'openApiSpec',
    };

    for (const [command, templateKey] of Object.entries(commandMap)) {
        context.subscriptions.push(
            vscode.commands.registerCommand(command, () => insertTemplate(templateKey))
        );
    }

    // Register the "Show All Templates" quick-pick command
    context.subscriptions.push(
        vscode.commands.registerCommand('securityCopilot.showTemplateMenu', async () => {
            const items = Object.entries(templates).map(([key, val]) => ({
                label: `$(symbol-file) ${val.label}`,
                detail: val.detail,
                key,
            }));

            const selected = await vscode.window.showQuickPick(items, {
                placeHolder: 'Select a Security Copilot template to insert',
                matchOnDetail: true,
            });

            if (selected) {
                await insertTemplate(selected.key);
            }
        })
    );
}

async function insertTemplate(templateKey: string): Promise<void> {
    const template = templates[templateKey];
    if (!template) {
        return;
    }

    const editor = vscode.window.activeTextEditor;
    if (editor) {
        await editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, template.content);
        });
    } else {
        // No active editor — create a new untitled YAML document
        const doc = await vscode.workspace.openTextDocument({
            language: 'yaml',
            content: template.content,
        });
        await vscode.window.showTextDocument(doc);
    }
}

export function deactivate() {}
