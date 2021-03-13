import { Model, Table, PrimaryKey, AutoIncrement, HasMany, Column, Unique } from 'sequelize-typescript';
import { DocumentReference } from './documentReference.model';

@Table
export class Document extends Model {

	@PrimaryKey
	@AutoIncrement
	@Column
	id!: number;

	@Unique(true)
	@Column
	path!: string;

	@Unique(true)
	@Column
	thumbnailPath!: string;

	@HasMany(() => DocumentReference)
	documentReferences!: DocumentReference[];

}