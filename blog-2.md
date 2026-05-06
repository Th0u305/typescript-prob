## 🏛️ Part 2: The Four OOP Pillars in Large-Scale TypeScript

Object-Oriented Programming isn’t just about classes. It’s a set of design principles that help manage complexity, enforce boundaries, and keep large codebases maintainable. TypeScript enhances these pillars with static typing and modern syntax.

### 1. 🔒 Encapsulation: Hide the Implementation, Expose the Contract
Encapsulation restricts direct access to internal state and logic. In TypeScript, this is enforced via access modifiers and module boundaries.

```ts
class Cart {
  private items: Map<string, number> = new Map();
  public readonly currency: string;

  constructor(currency: string) {
    this.currency = currency;
  }

  public addItem(id: string, qty: number): void {
    if (qty <= 0) throw new Error("Invalid quantity");
    this.items.set(id, (this.items.get(id) || 0) + qty);
  }

  public getTotal(): number {
    // Complex pricing logic hidden from consumers
    return [...this.items.entries()].reduce(/*...*/);
  }
}
```
**Large-scale benefit:** Teams can refactor internals without breaking consumers. State mutations are centralized, making debugging and testing predictable.

### 2. 🎭 Abstraction: Focus on "What", Not "How"
Abstraction exposes only essential features while hiding complexity. TypeScript uses `interface`, `abstract class`, and type aliases to define contracts.

```ts
interface PaymentProcessor {
  process(amount: number): Promise<PaymentResult>;
}

class StripeProcessor implements PaymentProcessor { /*...*/ }
class PayPalProcessor implements PaymentProcessor { /*...*/ }
```
**Large-scale benefit:** Business logic depends on abstractions, not implementations. You can swap payment providers, caching layers, or database drivers without rewriting core workflows.

### 3. 🧬 Inheritance: Share Behavior, But Use Sparingly
Inheritance establishes an `is-a` relationship and enables code reuse via `extends`.

```ts
abstract class Repository<T> {
  protected abstract db: DatabaseConnection;

  public async findById(id: string): Promise<T | null> {
    return this.db.query<T>(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
  }
}

class UserRepository extends Repository<User> { /*...*/ }
```
**Large-scale benefit:** Reduces duplication for shared CRUD, logging, or validation logic.  
⚠️ **Modern TS Note:** Favor composition (`implements` + dependency injection) over deep inheritance trees to avoid fragile base class problems.

### 4. 🔄 Polymorphism: One Interface, Many Behaviors
Polymorphism lets different types respond to the same method call in their own way. TypeScript enables this through interfaces, method overrides, and union types.

```ts
function notifyUsers(processor: PaymentProcessor, users: User[]) {
  users.forEach(user => {
    if (user.preferences.notifications === "email") {
      sendEmail(user, processor.process);
    } else {
      sendPush(user, processor.process);
    }
  });
}
```
**Large-scale benefit:** Enables plugin architectures, dependency injection, and strategy patterns. Code becomes open for extension but closed for modification (Open/Closed Principle).

---

## 🧩 How These Principles Scale Together

In a 100k+ line TypeScript codebase, these concepts form a feedback loop:

| Principle | Solves | TS Feature That Enforces It |
|-----------|--------|-----------------------------|
| Encapsulation | Uncontrolled state mutations | `private`/`protected`, `readonly`, module exports |
| Abstraction | Tight coupling to implementations | `interface`, `type`, abstract classes |
| Inheritance | Repeated boilerplate logic | `extends`, generics with constraints |
| Polymorphism | Rigid, hard-to-test workflows | Interface implementation, union types, DI containers |

When combined with TypeScript’s strict compiler flags (`strictNullChecks`, `noImplicitAny`, `exactOptionalPropertyTypes`), these pillars transform chaotic JavaScript into a predictable, refactor-friendly system.

---

## ✅ Takeaways for Production TypeScript

1. **Ban `any` in new code.** Use `unknown` + type guards for external data.
2. **Type narrow early.** Validate at boundaries (API handlers, event listeners, config loaders).
3. **Design with interfaces first.** Let implementations come later.
4. **Encapsulate aggressively.** Expose only what consumers need.
5. **Prefer composition over inheritance.** Use `implements` and DI for flexibility.
6. **Enable `strict: true` in `tsconfig.json`.** Let the compiler catch architectural drift.

TypeScript doesn’t just add types to JavaScript. It adds **discipline**. And in large-scale projects, discipline is what separates maintainable systems from legacy spaghetti.

---
*Found this useful? Share it with your team, drop a comment with your favorite TypeScript narrowing pattern, or let me know which OOP principle you find hardest to apply in modern TS!*