- **Token**: Design decision written in JSON files; Platform agnostic, shareable across disciplines, tools, and technologies. Used as a common vocabulary across the organization. It makes sense that the name of the token matches the name of its variable counterpart.
	e.g. Token: group.subgroup.token_name <> Variable: group/subgroup/variable_name
	Can't be included in token name:
	- $ (dollar sign)
	- {} (curly brackets)
	- . (period)
	- "value"
	- case sensitive
	It's useful to research and understand best practices around how to name tokens.
	Themes (and Figma Modes of those themes) > Token Sets: No-code version of a JSON file (Figma Collections of Variables)> Design Tokens 
	
	**Token Architecture (Three-Tiered Approach)**
	- **Brand Collection (The Roots):** The foundation of a system containing raw hex codes and values without any specific roles assigned.
	- **Alias Collection (The Trunk):** The middle layer that assigns **roles to scales** (e.g., designating a specific purple scale as "Primary") and handles multi-brand variations.
	- **Mapped Collection (The Leaves):** Functional variables specifically for **surfaces, borders, text, and icons** that connect back to the alias collection for use in designs

- **Figma Variable:** a representation of the design token. It's not a token. Figma Variables live in Figma Collections. In Token-Studio, it's analogous to Theme Groups.
- **Variants:** Different versions of a single component (e.g., default, hover, or disabled states)
- **Scoping:** The technique of **limiting where a variable appears** in selection menus, ensuring designers only see relevant options (e.g., a "radius" variable only appearing in the corner radius menu).
- **States:** The visual or functional condition of a component, such as **hover, selected, or behavior** on click
- **Modes:** A feature that allows for multiple values within a single variable collection, enabling rapid switching between **Light/Dark modes**, different brands, or different languages
