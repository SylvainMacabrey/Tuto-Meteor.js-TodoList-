import { Meteor } from 'meteor/meteor';
import { Notes, NoteUpsertSchema } from '../collections/Notes.js';
import { check } from 'meteor/check';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'insertNote'({note}) {
    NoteUpsertSchema.validate(note);
    Notes.insert({
      title: note.title,
      content: note.content,
      userId: this.userId,
      createdAt: new Date()
    });
  },
  'updateNote'({note}) {
    NoteUpsertSchema.validate(note);
    Notes.update(note.id, {
      $set: {
        title: note.title,
        content: note.content
      }
    });
  },
  'deleteNote'({id}) {
    check(id, String);
    Notes.remove(id);
  },
});

Meteor.publish('notes.own', function() {
  return Notes.find({userId: this.userId});
});