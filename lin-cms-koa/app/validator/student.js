import { LinValidator, Rule } from "lin-mizar";

class StudentSearchValidator extends LinValidator {
  constructor() {
    super();
    this.q = new Rule("isNotEmpty", "必须传入搜索关键字");
  }
}

class CreateOrUpdateStudentValidator extends LinValidator {
  constructor() {
    super();
    this.name = new Rule("isNotEmpty", "必须传入学生姓名");
    this.studentNum = new Rule("isNotEmpty", "必须传入学号");
    // this.summary = new Rule("isNotEmpty", "必须传入图书综述");
    // this.image = new Rule("isLength", "图书插图的url长度必须在0~100之间", {
    //   min: 0,
    //   max: 100,
    // });
  }
}

export { CreateOrUpdateStudentValidator, StudentSearchValidator };
