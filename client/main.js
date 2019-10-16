import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Notes } from '../collections/Notes';

import './main.html';
import { check } from 'meteor/check';

Template.accueil.events({
  'click .js-logout' (event, instance) {
    Meteor.logout();
  }
});

Template.form_new_note.events({
  'submit #js-new_note' (event, instance) {
    event.preventDefault();
    Meteor.call('insertNote', {
      note: {
        title: event.target.title.value,
        content: event.target.content.value,
      }
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
      }
    });
    event.target.title.value = '';
    event.target.content.value = '';
  }
});

Template.list_notes.onCreated(function() {
  this.subscribe('notes.own');
});

Template.list_notes.helpers({
  notes() {
    return Notes.find({userId: Meteor.userId});
  }
});

Template.single_note.events({
  'click .js-note' (event, instance) {
    // installer peppelg:bootstrap-3-modal
    Modal.show('modal_note', instance.data);
  }
});

Template.modal_note.events({
  'submit .js-edit_note' (event, instance) {
    event.preventDefault();
    Meteor.call('updateNote', {
      note: {
        id: instance.data.note._id,
        title: event.target.title.value,
        content: event.target.content.value,
      }
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
      }
    });
    Modal.hide('modal_note');
  },
  'click .js-delete_note' (event, instance) {
    check(instance.data.note._id, String);
    Meteor.call('deleteNote', {
      id: instance.data.note._id
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
      }
    });
    Modal.hide('modal_note');
  }
});