import {getCardsForInput} from "./getCardsForInput";

describe('getCardsForInput', () => {
   it('should get expected cards for input', () => {
      const cards = getCardsForInput('Have you heard about the shining Orb card, it is really cool!');
      expect(cards.length).toBe(1);
   });
});