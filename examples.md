# Sheet Prompt Examples

This document provides examples of how to use the Sheet Prompt extension effectively.

## Basic Character Sheet Example

```
<sheet>
Name: Alex Chen
Age: 28
Occupation: Software Developer
Personality: Curious, analytical, slightly introverted
Current Mood: Focused and determined
Location: Modern office building, downtown
</sheet>
```

## Roleplay Context Example

```
<sheet>
Setting: Victorian London, 1887
Character: Dr. Margaret Whitmore
Status: Investigating strange occurrences
Equipment: Medical bag, notebook, magnifying glass
Knowledge: Medicine, basic forensics
Companions: Inspector Hayes (suspicious but cooperative)
</sheet>
```

## Dynamic Stats Example

```
<sheet>
HP: 85/100
MP: 42/60
Status Effects: Well-rested (+1 to mental tasks)
Inventory: Healing potion x2, Iron sword, Leather armor
Location: Tavern in Millbrook Village
Quest: Find the missing merchant caravan
</sheet>
```

## Conversation Context Example

```
<sheet>
Previous conversation topics:
- Discussed favorite books (loves sci-fi)
- Mentioned upcoming trip to Japan
- Expressed interest in learning guitar
- Currently stressed about work deadline
Relationship: Close friend since college
Communication style: Casual, uses humor to deflect stress
</sheet>
```

## Usage Tips

1. **Keep it concise**: The sheet content is appended to every message, so keep it relevant and not too long
2. **Update regularly**: Modify the sheet content as the conversation or roleplay evolves
3. **Use consistent format**: Develop a format that works for your use case and stick to it
4. **Toggle as needed**: Disable the extension when you don't need the sheet content
5. **Manual control**: Remember you can manually add `<sheet></sheet>` tags anywhere in your message for more control

## Advanced Usage

### Conditional Content
You can manually control when sheet content appears by disabling the auto-append and manually adding `<sheet></sheet>` tags only when needed.

### Multiple Scenarios
Keep different sheet templates saved in a text file and copy-paste them into the extension as needed for different characters or scenarios.

### Integration with Other Extensions
The sheet content works alongside other SillyTavern extensions and won't interfere with their functionality.