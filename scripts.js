// Backbone model 

var Blog = Backbone.Model.extend({
  defaults: {
    author: "", 
    title: "", 
    url: ""
  }
});

//Backbone collection 

var Blogs = Backbone.Collection.extend({});

// var BlogOne = new Blog({author: "Michael", title: "Michael's blog", url: "http://michaelsblog.com"});
// var BlogTwo = new Blog({author: "John", title: "John's blog", url: "http://johnsblog.com"});

// Instantiate a collection 
var blogs = new Blogs();

// Backbone views 

// Backbone view for one blog
var BlogView = Backbone.View.extend({
  model: new Blog(), 
  tagName: 'tr', 
  initialize: function() {
    this.template = _.template($('.blogs-list-template').html());
  }, 
  events: {
		'click .edit-blog': 'edit',
		'click .update-blog': 'update',
		'click .cancel': 'cancel',
		'click .delete-blog': 'delete'
	},
  edit: function() {
		$('.edit-blog').hide();
		$('.delete-blog').hide();
		this.$('.update-blog').show();
		this.$('.cancel').show();

		var author = this.$('.author').html();
		var title = this.$('.title').html();
		var url = this.$('.url').html();

		this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
		this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
		this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');
	},
	update: function() {
		this.model.set('author', $('.author-update').val());
		this.model.set('title', $('.title-update').val());
    this.model.set('url', $('.url-update').val());
    BlogsView.render();
	},
	cancel: function() {
		BlogsView.render();
	},
	delete: function() {
		this.model.destroy();
	},
  render: function() {
    this.$el.html(this.template(this.model.toJSON())); 
    return this; 
  }
});

// Backbone view for all blogs
var BlogsView = Backbone.View.extend({
  model: blogs, 
  el: $('.blogs-list'), 
  initialize: function() {
    this.model.on('add', this.render, this);
  }, 
  render: function() {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(blog){
      self.$el.append((new BlogView({model: blog})).render().$el); 
    }); 
    return this;
  }
});

var BlogsView = new BlogsView();

$(document).ready(function(){
  $('.add-blog').on('click', function(){
    var blog = new Blog({
      author: $('.author-input').val(), 
      title: $('.title-input').val(), 
      url: $('.url-input').val()
    });
    $('.author-input').val('');
		$('.title-input').val('');
		$('.url-input').val('');
    blogs.add(blog);
  })
})