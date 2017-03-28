export class Fermentation
{
    id: number;
    name: string;
    recipe_id: number;
    description: string;
    start_date: number;
    is_active: boolean;
    location: string;

    temperature: number;
    ph: number;
    alcohol: number;
    sugar: number;

    selected: boolean;

    constructor(jsonData: Object, selected: boolean)
    {
        if(jsonData)
        {
            this.id = jsonData['id'];
            this.name = jsonData['name'];
            this.recipe_id = jsonData['recipe_id'];
            this.description = jsonData['description'];
            this.start_date = jsonData['start_date'];
            this.is_active = jsonData['is_active'];
            this.location = jsonData['location'];

            this.temperature = jsonData['temperature'];
            this.ph = jsonData['ph'];
            this.alcohol = jsonData['alcohol'];
            this.sugar = jsonData['sugar'];
        }

        this.selected = selected;
    }

    setId(id: number)
    {
        this.id = id;
    }

    getId(): number
    {
        return this.id;
    }

    setName(name: string)
    {
        this.name = name;
    }

    getName(): string
    {
        return this.name;
    }

    setRecipeId(recipe_id: number)
    {
        this.recipe_id = recipe_id;
    }

    getRecipeId(): number
    {
        return this.recipe_id;
    }

    setDescription(description: string)
    {
        this.description = description;
    }

    getDescription(): string
    {
        return this.description;
    }

    setStartDate(start_date: number)
    {
        this.start_date = start_date;
    }

    getStartDate(): number
    {
        return this.start_date;
    }

    setActive(is_active: boolean)
    {
        this.is_active = is_active;
    }

    isActive(): boolean
    {
        return this.is_active;
    }

    setLocation(location: string)
    {
        this.location = location;
    }

    getLocation(): string
    {
        return this.location;
    }


    setTemperature(temperature: number)
    {
        this.temperature = temperature;
    }

    getTemperature(): number
    {
        return this.temperature;
    }

    setPH(ph: number)
    {
        this.ph = ph;
    }

    getPH(): number
    {
        return this.ph;
    }

    setAlcohol(alcohol: number)
    {
        this.alcohol = alcohol;
    }

    getAlcohol(): number
    {
        return this.alcohol;
    }

    setSugar(sugar: number)
    {
        this.sugar = sugar;
    }

    getSugar(): number
    {
        return this.sugar;
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