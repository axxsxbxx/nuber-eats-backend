import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RestaurantResolver {
  @Query((returns) => Boolean)
  // eslint-disable-next-line @typescript-eslint/ban-types
  isPizzaGood(): Boolean {
    return true;
  }
}
