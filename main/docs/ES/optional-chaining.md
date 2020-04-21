# optional chaining

```
const city = person.address?.city; // person.address could be not defined
const isNeighbor = person.address?.isCloseTo(me);

person.sayHayUsing?.("Twitter"); // The person.sayHayUsing method could be not defined
```
