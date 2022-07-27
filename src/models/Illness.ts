import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/db'
import User from './User';

export interface IIllness {
    id?: string;
    disease_name: string;
    sugar: number;
    fat: number;
    oxygen: number;
    risk: string;
    id_user: string;
}

class Illness extends Model<IIllness> implements IIllness {
    declare id: string;
    declare disease_name: string;
    declare sugar: number;
    declare fat: number;
    declare oxygen: number;
    declare risk: string;
    declare id_user: string;
    declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

Illness.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    disease_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sugar: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false
    },
    fat: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false
    },
    oxygen: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false
    },
    risk: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_user: {
        type: DataTypes.STRING,
        allowNull: false
    }}, {
		tableName: "illnesses",
        timestamps: true,
		sequelize
	}
)

User.hasMany(Illness, { foreignKey: 'id_user', onDelete: 'cascade' })
Illness.belongsTo(User, { foreignKey: 'id_user', onDelete: 'cascade' })

export default Illness;