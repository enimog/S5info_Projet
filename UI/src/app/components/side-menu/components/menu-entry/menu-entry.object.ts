export class MenuEntryObject
{
    text: string;
    value: number;
    selected: boolean;

    constructor(text: string, value: number, selected: boolean)
    {
        this.text = text;
        this.value = value;
        this.selected = selected;
    }

    setText(text: string)
    {
        this.text = text;
    }

    getText(): string
    {
        return this.text;
    }

    setValue(value: number)
    {
        this.value = value;
    }

    getValue(): number
    {
        return this.value;
    }

    isSelected(): boolean
    {
        return this.selected;
    }

    select()
    {
        this.selected = true;
    }

    deselect()
    {
        this.selected = false;
    }
}