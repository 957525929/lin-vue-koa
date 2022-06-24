import { NotFound, Forbidden } from "lin-mizar";
import Sequelize from "sequelize";
import { Student } from "../model/student";

class StudentDao {
  async getStudent(id) {
    const student = await Student.findOne({
      where: {
        id,
      },
    });
    return student;
  }

  async getStudentByKeyword(q) {
    const student = await Student.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`,
        },
      },
    });
    return student;
  }

  async getStudents() {
    const students = await Student.findAll();
    return students;
  }

  async createStudent(v) {
    // console.log("v"), v;
    // console.log("aaaaaaawwweeeeeeaaaaa1111aaaaa", bk);
    const student = await Student.findOne({
      where: {
        name: v.get("body.name"),
      },
    });

    if (student) {
      throw new Forbidden({
        code: 10240,
      });
    }
    const bk = new Student();

    bk.name = v.get("body.name");
    bk.studentNum = v.get("body.studentNum");
    // bk.summary = v.get("body.summary");
    // bk.image = v.get("body.image");
    await bk.save();
  }

  async updateStudent(v, id) {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new NotFound({
        code: 10022,
      });
    }
    console.log("student", student);
    student.name = v.get("body.name");
    student.studentNum = v.get("body.studentNum");
    // student.summary = v.get("body.summary");
    // student.image = v.get("body.image");
    await student.save();
  }

  async deleteStudent(id) {
    const student = await Student.findOne({
      where: {
        id,
      },
    });
    if (!student) {
      throw new NotFound({
        code: 10022,
      });
    }
    student.destroy();
  }
}

export { StudentDao };
