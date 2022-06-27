import { LinRouter, NotFound, disableLoading } from "lin-mizar";
import { groupRequired } from "../../middleware/jwt";
import { StudentSearchValidator, CreateOrUpdateStudentValidator } from "../../validator/student";
import { PositiveIdValidator } from "../../validator/common";

import { getSafeParamId } from "../../lib/util";
import { StudentNotFound } from "../../lib/exception";
import { StudentDao } from "../../dao/student";

// book 的红图实例
const studentApi = new LinRouter({
  prefix: "/v1/student",
  module: "学生",
});

// book 的dao 数据库访问层实例
const studentDto = new StudentDao();

studentApi.get("/:id", async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get("path.id");
  const book = await studentDto.getStudent(id);
  if (!book) {
    throw new NotFound({
      code: 10022,
    });
  }
  ctx.json(book);
});

studentApi.get("/", async (ctx) => {
  // const books = await studentDto.getStudents();

  // if (!books || books.length < 1) {
  //   throw new NotFound({
  //     message: '没有找到相关书籍'
  //   });
  // }
  console.log("ctxctxctx", ctx.query);
  const book = await studentDto.getStudentByKeyword(ctx.query);
  console.log("book", book);
  if (!book) {
    throw new StudentNotFound();
  }

  ctx.json(book);
  // console.log("book111111111111111s", ctx);
});

studentApi.get("/search/one", async (ctx) => {
  const v = await new StudentSearchValidator().validate(ctx);
  const book = await studentDto.getStudentByKeyword(v.get("query.q"));
  if (!book) {
    throw new StudentNotFound();
  }
  ctx.json(book);
});

studentApi.post("/", async (ctx) => {
  const v = await new CreateOrUpdateStudentValidator().validate(ctx);
  // console.log("v222222222222222222222222222", v);
  await studentDto.createStudent(v);
  // console.log("ctxctxctxctxctxctxctx", ctx);
  ctx.success({
    code: 16,
  });
});

studentApi.put("/:id", async (ctx) => {
  const v = await new CreateOrUpdateStudentValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await studentDto.updateStudent(v, id);
  ctx.success({
    code: 17,
  });
});

studentApi.linDelete("deleteBook", "/:id", studentApi.permission("删除图书"), groupRequired, async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get("path.id");
  await studentDto.deleteStudent(id);
  ctx.success({
    code: 18,
  });
});

module.exports = { studentApi, [disableLoading]: false };
