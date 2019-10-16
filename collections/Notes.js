import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export const Notes =  new Mongo.Collection('notes');

export const NoteUpsertSchema = new SimpleSchema({
    id: {
        type: String,
        optional: true
    },
    title: {
        type: String,
        max: 10
    },
    content: {
        type: String,
        max: 300
    }
}, { check });