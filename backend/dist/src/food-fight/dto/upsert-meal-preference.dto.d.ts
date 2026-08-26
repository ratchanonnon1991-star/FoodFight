export type FrontendMealPreferenceBudget = 'LOW' | 'MID' | 'HIGH' | 'ANY';
export declare class UpsertMealPreferenceDto {
    cookingMethods: string[];
    cookingMethodsOther?: string | null;
    cuisines: string[];
    cuisinesOther?: string | null;
    proteins: string[];
    proteinsOther?: string | null;
    budget?: FrontendMealPreferenceBudget;
    restaurantStyles: string[];
    restaurantStylesOther?: string | null;
    additionalNuances?: string | null;
}
