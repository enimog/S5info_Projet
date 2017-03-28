export class Recipe
{
    id: number;
    name: string;
    description: string;
    target_temperature: number;
    target_ph: number;
    target_alcohol: number;
    target_sugar: number;

    constructor(jsonData: Object)
    {
        if(jsonData)
        {
            this.id = jsonData['id'];
            this.name = jsonData['name'];
            this.description = jsonData['description'];
            this.target_temperature = jsonData['target_temperature'];
            this.target_ph = jsonData['target_ph'];
            this.target_alcohol = jsonData['target_alcohol'];
            this.target_sugar = jsonData['target_sugar'];
        }      
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

    setDescription(description: string)
    {
        this.description = description;
    }

    getDescription(): string
    {
        return this.description;
    }

    setTargetTemperature(target_temperature: number)
    {
        this.target_temperature = target_temperature;
    }

    getTargetTemperature(): number
    {
        return this.target_temperature;
    }

    setTargetPH(target_ph: number)
    {
        this.target_ph = target_ph;
    }

    getTargetPH(): number
    {
        return this.target_ph;
    }

    setTargetAlcohol(target_alcohol: number)
    {
        this.target_alcohol = target_alcohol;
    }

    getTargetAlcohol(): number
    {
        return this.target_alcohol;
    }

    setTargetSugar(target_sugar: number)
    {
        this.target_sugar = target_sugar;
    }

    getTargetSugar(): number
    {
        return this.target_sugar;
    }
}