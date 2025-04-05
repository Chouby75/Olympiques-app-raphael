// TODO: create here a typescript interface for a participation
/*
example of participation:
{
    id: 1,
    year: 2012,
    city: "Londres",
    medalsCount: 28,
    athleteCount: 372
}
*/

export class Participation {
  constructor(
    public id: number,
    public year: Date,
    public city: string,
    public medalsCount: number,
    public athleteCount: number
  ) {}
}
