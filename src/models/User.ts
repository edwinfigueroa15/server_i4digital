import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/db'

export interface IUser {
    identification_number: string;
    identification_type: string;
    name: string;
    surname: string;
    age: number;
    date_of_birth: Date;
    address: string;
    phone: string;
    blood_type: string;
    email: string;
    status?: boolean;
}

class User extends Model<IUser> implements IUser {
    declare identification_number: string;
    declare identification_type: string;
    declare name: string;
    declare surname: string;
    declare age: number;
    declare date_of_birth: Date;
    declare address: string;
    declare phone: string;
    declare blood_type: string;
    declare email: string;
    declare status?: boolean;
    declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

User.init({
    identification_number: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    identification_type: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    blood_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }}, {
		tableName: "users",
        timestamps: true,
		sequelize
	}
)

export default User;