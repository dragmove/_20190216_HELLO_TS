/*
 * object destructuring
 */
function printProfile({ name, nationality = 'none' } = { name: 'anonymous' }) {
  console.log(name, nationality);
}

printProfile(); // 'anonymous', 'none'

printProfile({ name: 'foo' }); // 'foo', 'none'.

printProfile({ name: 'bar', nationality: 'usa' }); // 'bar', 'usa' // If input argument, 'name' is required. 'nationality' is optional.

// printProfile({ nationality: 'bar'}); // If input argument, 'name' is required. 'nationality' is optional.

/*
 * array destructuring
 */
let numbers: string[] = ['one', 'two', 'three', 'four', 'five'];

let [num1] = numbers;
console.log('num1 :', num1); // 'one'

// skip
let [, , num3, num4] = numbers;
console.log('num3 :', num3); // 'three'
console.log('num4 :', num4); // 'four'

// swap variable values
[num3, num4] = [num4, num3];
console.log('num3 :', num3); // 'four'
console.log('num4 :', num4); // 'three'

// set default value
let [color1, color2 = 'blue'] = ['black'];
console.log('color1 :', color1); // 'black'
console.log('color2 :', color2); // 'blue'

function f([first, second]: [number, string]) {
  console.log('first, second :', first, second);
}
f([99, 'hello']);

/*
 * interface
 */
interface Person {
  name: string;
  hello(this: Person, _name: string): string;
}

let typedPerson: Person = {
  name: 'foo',
  hello: function(this: Person, _name: string): string {
    let msg = `Hello, ${this.name} ${_name}`;
    return msg;
  }
};
console.log(typedPerson.hello('world'));

/*
 * define type of callback function
 */
type EchoCallbackType = (msg: string) => void;

let cb: EchoCallbackType = msg => msg;

function hof(msg: string, callback: EchoCallbackType) {
  return callback(msg);
}

console.log(hof('hi', cb));

/*
 * class
 */
class FlashLight {
  constructor(public lightIntensity: number) {}
}

class Bicycle {
  protected brandName: string = '';

  constructor(public numberOfWheel: number) {}

  public getNumberOfWheel(): number {
    return this.numberOfWheel;
  }

  protected getBrandName(): string {
    return `bicycle ${this.brandName}`;
  }
}

class MountainBike extends Bicycle {
  // private inch: number = 15;
  public flashLight: FlashLight;

  constructor(public numberOfWheel: number, public hasBackSaddle: boolean) {
    super(numberOfWheel);

    this.flashLight = new FlashLight(99);
  }

  /*
  private getInch(): number {
    return this.inch;
  }
  */

  public getHasBackSaddle(): boolean {
    return this.hasBackSaddle;
  }

  protected getBrandName(): string {
    return `mountainBike ${this.brandName}`;
  }
}

let mountainBike = new MountainBike(2, true);

// pritvate variables
// console.log('mountainBike.inch :', mountainBike.inch); // throw Error

// private methods
// console.log('mountainBike.getInch() :', mountainBike.getInch()); // throw Error

// public variables
console.log('mountainBike.flashLight :', mountainBike.flashLight);

// public methods
console.log('mountainBike.getNumberOfWheel :', mountainBike.getNumberOfWheel()); // 2
console.log('mountainBike.getHasBackSaddle :', mountainBike.getHasBackSaddle()); // true

// protected variables
// console.log('mountainBike.brandName :', mountainBike.brandName); // throw Error

// protected methods
// console.log('mountainBike.getBrandName() :', mountainBike.getBrandName()); // throw Error

/*
 * abstract class
 */
abstract class AbsMan {
  abstract name: string;

  abstract talkMsg(msg: string): void;

  abstract init(option?: any): any;

  abstract destroy(option?: any): any;

  public getName(): string {
    return this.name;
  }

  public talk(msg: string): void {
    return this.talkMsg(msg);
  }
}

class Man extends AbsMan {
  public name = 'man';

  public talkMsg(msg: string): string {
    return msg;
  }

  public init(option?: any): any {
    console.log('Man init');
  }

  public destroy(option?: any): any {
    console.log('Man destroy');
  }

  constructor() {
    super();
  }
}

let man: Man = new Man();
console.log('man.getName() :', man.getName()); // 'man'
console.log('man.talk("hello") :', man.talk('hello')); // 'hello'

console.log('man.talkMsg("hi") :', man.talkMsg('hi')); // 'hi'
man.init(); // 'Man init'
man.destroy(); // 'Man destroy'
