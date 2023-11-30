import { Ingredient } from './ingredient';
import { Step } from './step';
import { Qualification } from './qualification';

export interface Recipe {
  _id?: string;
  idUser: string;
  name: string;
  description: string;
  qualification: Qualification[];
  duration: number;
  type: string;
  difficulty: string;
  category: string;
  image: string;
  ingredients: Ingredient[];
  steps: Step[];
}
