import { createClass } from "./create-class";
import { Selection, Position } from "./editor";
import {
  createShouldUpdateCodeFor,
  createShouldNotUpdateCodeFor
} from "./test-helpers";

const shouldUpdateCodeFor = createShouldUpdateCodeFor(createClass);
const shouldNotUpdateCodeFor = createShouldNotUpdateCodeFor(createClass);

describe("create class declaration from a new expression", () => {
  it("with nothing else", () => {
    shouldUpdateCodeFor({
      code: "new ReadCode();",
      selection: Selection.cursorAt(0, 0),
      expected: {
        code: `
class ReadCode {
  \${0:constructor() {
    // Implement
  }}
}`,
        position: new Position(1, 0),
        name: 'Create class "ReadCode"'
      }
    });
  });

  it("assigned to a variable", () => {
    shouldUpdateCodeFor({
      code: "const code = new ReadCode();",
      selection: Selection.cursorAt(0, 13),
      expected: {
        code: `
class ReadCode {
  \${0:constructor() {
    // Implement
  }}
}`
      }
    });
  });

  it("assignment called with await", () => {
    shouldUpdateCodeFor({
      code:
        "async function doSomethingAsync() { const code = await new ReadCode(); }",
      selection: Selection.cursorAt(0, 60),
      expected: {
        code: `
class ReadCode {
  \${0:constructor() {
    // Implement
  }}
}`
      }
    });
  });

  it("await without assignment", () => {
    shouldUpdateCodeFor({
      code: "async function doSomethingAsync() { await new ReadCode(); }",
      selection: Selection.cursorAt(0, 45),
      expected: {
        code: `
class ReadCode {
  \${0:constructor() {
    // Implement
  }}
}`
      }
    });
  });

  it("param of another call", () => {
    shouldUpdateCodeFor({
      code: "console.log(new ReadCode());",
      selection: Selection.cursorAt(0, 13)
    });
  });

  it("with assigned value referenced later", () => {
    shouldUpdateCodeFor({
      code: `const code = new ReadCode();
write(code);`,
      selection: Selection.cursorAt(0, 13),
      expected: {
        code: `
class ReadCode {
  \${0:constructor() {
    // Implement
  }}
}

`
      }
    });
  });

  it("doesn't add unnecessary blank lines (1 blank line in-between)", () => {
    shouldUpdateCodeFor({
      code: `const code = new ReadCode();

write(code);`,
      selection: Selection.cursorAt(0, 13),
      expected: {
        code: `
class ReadCode {
  \${0:constructor() {
    // Implement
  }}
}
`
      }
    });
  });

  it("doesn't add unnecessary blank lines (2+ blank lines in-between)", () => {
    shouldUpdateCodeFor({
      code: `const code = new ReadCode();



write(code);`,
      selection: Selection.cursorAt(0, 13),
      expected: {
        code: `
class ReadCode {
  \${0:constructor() {
    // Implement
  }}
}`
      }
    });
  });

  it("with other class declarations in the code", () => {
    shouldUpdateCodeFor({
      code: `new ReadCode();

class Write {

}`,
      selection: Selection.cursorAt(0, 0)
    });
  });

  it("with params", () => {
    shouldUpdateCodeFor({
      code: `new ReadCode(selection, "hello", 12);`,
      selection: Selection.cursorAt(0, 0),
      expected: {
        code: `
class ReadCode {
  \${0:constructor(\${1:selection}, \${2:param2}, \${3:param3}) {
    // Implement
  }}
}`,
        name: 'Create class "ReadCode"'
      }
    });
  });

  it("nested in expression statements", () => {
    shouldUpdateCodeFor({
      code: `it("should read code", () => {
  const code = new ReadCode();

  expect(code).toBe("hello");
});
`,
      selection: Selection.cursorAt(1, 15),
      expected: {
        code: `
class ReadCode {
  \${0:constructor() {
    // Implement
  }}
}`,
        position: new Position(5, 0)
      }
    });
  });
});
