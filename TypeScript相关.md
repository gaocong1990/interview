## 泛型
泛型，简单来说就是类型参数，在定义某些**函数**、**接口**和**类**时，不写死类型，而是改用类型参数的形式，让类型更加灵活。

函数声明：
```typescript
function returnItem<T>(para: T): T {
    return para
}
```

接口声明:
```typescript
interface ReturnItemFn<T> {
    (para: T): T
}
// 使用
const returnItem: ReturnItemFn<number> = para => para
```

类声明:
```typescript
class Stack<T> {
    private arr: T[] = []

    public push(item: T) {
        this.arr.push(item)
    }

    public pop() {
        this.arr.pop()
    }
}
const stack = new Stacn<number>()
```
如果上述只能传递 string 和 number 类型，这时候就可以使用 <T extends xx> 的方式猜实现约束泛型，如下所示：
```typescript
type Params = string | number;

class Stack<T extends Params> {
  ...// 跟上面一样
}

const stack = new Stack<boolean>(); // ts报错：类型“boolean"不满足约束”Params"
```

索引类型和约束类型
索引类型 `keyof T` 把传入的对象的属性类型取出生成一个联合类型，这里的泛型 U 被约束在这个联合类型中
```typescript
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key] // ok
}
```

## 高级类型
常见的高级类型有如下：
- 交叉类型: `<T & U>` 包含T和U所有的属性
- 联合类型: <T | U>
- 类型别名：`type ID = number | string;` 声明一个新的类型ID
- 类型索引: `keyof T` 用于获取一个接口中 Key 的联合类型
- 类型约束： 通过关键字`extends`进行约束，`U extends keyof T` U只能是T的key联合类型中的一个
- 映射类型
  ``` typescript
  type Readonly<T> = {
      readonly [P in keyof T]: T[P];
  };

  interface Obj {
    a: string
    b: string
  }

  type ReadOnlyObj = Readonly<Obj>
  ```
  上述的结构，可以分成这些步骤：
  1. keyof T：通过类型索引 keyof 的得到联合类型 'a' | 'b'
  2. P in keyof T 等同于 p in 'a' | 'b'，相当于执行了一次 forEach 的逻辑，遍历 'a' | 'b'

  所以最终ReadOnlyObj的接口为下述：
  ``` typescript
  interface ReadOnlyObj {
    readonly a: string;
    readonly b: string;
  }
  ```
- 条件类型: `T extends U ? X : Y` 如果 T 是 U 的子集，就是类型 X，否则为类型 Y

## type 和 interface 的区别
1. 组合方式：interface 使用 extends 来实现继承，type 使用 & 来实现联合类型。
2. 扩展方式：interface 可以重复声明用来扩展，type 一个类型只能声明一次
3. 范围不同：type 适用于基本类型，interface 一般不行。
一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。


## tsconfig.json 中有哪些配置项信息
```json
{
  "files": [], // 文件的相对或绝对路径,指定待编译文件,只会编译包含在files中列出的文件
  "include": [], // 指定编译哪些文件
  "exclude": [], // 排除某些文件
  "compileOnSave": false, // 保存文件自动编译
  "extends": "",
  "compilerOptions": { ... } // 编译配置项: "target"/"strict"/"module"/paths设置路径别名
}
```

## 工具类型
TypeScript提供了一些内置的工具类型，这些类型可以帮助你更方便地操作和组合类型。以下是一些常用的TypeScript工具类型及其具体用法：

1. **Partial<T>**：将类型T的所有属性设置为可选。

   ```typescript
   type User = { name: string; age: number };
   type PartialUser = Partial<User>; // { name?: string; age?: number }
   ```

2. **Required<T>**：将类型T的所有属性设置为必选。

   ```typescript
   type User = { name?: string; age?: number };
   type RequiredUser = Required<User>; // { name: string; age: number }
   ```

3. **Readonly<T>**：将类型T的所有属性设置为只读。

   ```typescript
   type User = { name: string; age: number };
   type ReadonlyUser = Readonly<User>; // { readonly name: string; readonly age: number }
   ```

4. **Pick<T, K>**：从类型T中选择一组属性K。

   ```typescript
   type User = { name: string; age: number; email: string };
   type NameAndEmail = Pick<User, 'name' | 'email'>; // { name: string; email: string }
   ```

5. **Omit<T, K>**：从类型T中排除一组属性K。

   ```typescript
   type User = { name: string; age: number; email: string };
   type WithoutEmail = Omit<User, 'email'>; // { name: string; age: number }
   ```

6. **Record<K, T>**：创建一个类型，其属性名为K，属性值为T。

   ```typescript
   type UserRoles = Record<'admin' | 'user', string>; // { admin: string; user: string }
   ```

7. **Exclude<T, U>**：从类型T中排除可以赋值给类型U的那些类型。

   ```typescript
   type T = 'a' | 'b' | 'c';
   type U = Exclude<T, 'a' | 'b'>; // 'c'
   ```

8. **Extract<T, U>**：从类型T中提取可以赋值给类型U的那些类型。

   ```typescript
   type T = 'a' | 'b' | 'c';
   type U = Extract<T, 'a' | 'b'>; // 'a' | 'b'
   ```

9. **NonNullable<T>**：从类型T中排除`null`和`undefined`。

   ```typescript
   type T = string | null | undefined;
   type U = NonNullable<T>; // string
   ```

10. **ReturnType<T>**：获取函数类型T的返回类型。

    ```typescript
    type T = (a: number, b: number) => string;
    type U = ReturnType<T>; // string
    ```

11. **InstanceType<T>**：获取构造函数类型T的实例类型。

    ```typescript
    type T = new (a: number, b: number) => { a: number; b: number };
    type U = InstanceType<T>; // { a: number; b: number }
    ```

##  TypeScript支持的访问修饰符有哪些？
TypeScript支持访问修饰符 public，private 和 protected，它们决定了类成员的可访问性。

- 公共（Public），类的所有成员，其子类以及该类的实例都可以访问。
- 受保护（Projected），该类及其子类的所有成员都可以访问它们。 但是该类的实例无法访问。
- 私有（Private），只有类的成员可以访问它们。

如果未指定访问修饰符，则它是隐式公共的，因为它符合 JavaScript 的便利性。