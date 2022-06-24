import { InfoCrudMixin } from "lin-mizar";
import { merge } from "lodash";
import { Sequelize, Model } from "sequelize";
import sequelize from "../lib/db";

class Student extends Model {
  toJSON() {
    const origin = {
      id: this.id,
      name: this.name,
      studentNum: this.studentNum,
      summary: this.summary,
      create_time: this.create_time,
    };
    return origin;
  }
}

Student.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    studentNum: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: "未名",
    },
    summary: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
    create_time: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  merge(
    {
      sequelize,
      tableName: "student",
      modelName: "student",
    },
    InfoCrudMixin.options
  )
);

export { Student };
