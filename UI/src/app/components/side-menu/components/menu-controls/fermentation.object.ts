export class Fermentation
{
    id: string;
    selected: boolean;

    constructor(id: string, selected: boolean)
    {
        this.id = id;
        this.selected = selected;
    }

    setId(id: string)
    {
        this.id = id;
    }

    getId(): string
    {
        return this.id;
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