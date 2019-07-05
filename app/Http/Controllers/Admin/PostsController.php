<?php

namespace App\Http\Controllers\Admin;

use App\Model\Category;
use App\Model\Post;
use App\Model\Tag;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{

    public function get_all()
    {
        $posts = Post::all();
        $i = 0;
        foreach ($posts as $post) {
            $new_posts[] = $post;
            $category = Category::find($post->category_id);
            $new_posts[$i]['category_en'] = $category->title_en;
            $new_posts[$i]['category_ru'] = $category->title_ru;
            $new_posts[$i]['category_uz'] = $category->title_uz;
            $post = Post::find($post->id);
            $new_posts[$i]['tags'] = $post->getTagsTitlesString();
            $i++;
        }
        return $new_posts;
    }
    public function sidebar()
    {
        $posts = new Post;
        $data['popular_posts'] = $posts->popularPosts(3);
        $data['featured_posts'] = $posts->featuredPosts(3);
        $data['recent_posts'] = $posts->recentPosts(4);
        $categories = Category::all();
        foreach ($categories as $category) {
            $data['categories'][] = [
                'category' => $category,
                'number_of_posts' => $category->posts()->count()
            ];
        }
        return $data;
    }

    public function get_all_client()
    {
        $data['posts'] = $this->get_all();
        $data['sidebar'] = $this->sidebar();
        return $data;
    }

    public function show_client($id)
    {
        $data['post'] = $this->show($id);
        $data['sidebar'] = $this->sidebar();
        return $data;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title_en' => 'required',
            'title_ru' => 'required',
            'title_uz' => 'required',
            'content_en' => 'required',
            'content_ru' => 'required',
            'content_uz' => 'required',
            'description_en' => 'required',
            'description_ru' => 'required',
            'description_uz' => 'required',
            'image' => 'nullable|image'
        ]);

        $post = Post::add($request->all());
        $post->uploadImage($request->file('image'));
        $post->setCategory($request->category_id);
        $post->setTags($request->tags);
        $post->toggleStatus($request->status);
        $post->toggleFeatured($request->is_featured);

    }

    public function show($id)
    {
        $post = Post::find($id);
        $category = Category::find($post->category_id);
        $post['category_en'] = $category->title_en;
        $post['category_ru'] = $category->title_ru;
        $post['category_uz'] = $category->title_uz;
        $post['tags'] = $post->getTagsTitlesString();
        return $post;
    }

    public function edit($id)
    {
        $post = Post::find($id);
        $edit_posts = $post;
        $category = Category::find($post->category_id);
        $edit_posts['category_en'] = $category->title_en;
        $edit_posts['category_ru'] = $category->title_ru;
        $edit_posts['category_uz'] = $category->title_uz;
        $post = Post::find($post->id);
        $edit_posts['tags'] = $post->getTagsTitlesArray();
        $edit_posts['categories_all'] = Category::all();
        $edit_posts['tags_all'] = Tag::all();
        return $edit_posts;
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'title_en' => 'required',
            'title_ru' => 'required',
            'title_uz' => 'required',
            'content_en' => 'required',
            'content_ru' => 'required',
            'content_uz' => 'required',
            'description_en' => 'required',
            'description_ru' => 'required',
            'description_uz' => 'required'
        ]);

        $post = Post::find($request->id);
        $post->edit($request->all());
        $post->uploadImage($request->file('image'));
        $post->setCategory($request->category_id);
        $post->setTags($request->tags);
        $post->toggleStatus($request->status);
        $post->toggleFeatured($request->is_featured);

    }

    public function destroy($id)
    {
        Post::find($id)->remove($id);
    }

    public function views($id)
    {
        Post::find($id)->increment('views', 1);
    }

    public function get_category_posts($id)
    {
        $category = Category::where('id', $id)->firstOrFail();
        $posts = $category->posts()->get();
        if (count($posts) < 1) return response()->json(["Message" => "Posts not found"], 400);
        $i = 0;
        foreach ($posts as $post) {
            $data['posts'][] = $post;
            $category = Category::find($post->category_id);
            $data['posts'][$i]['category_en'] = $category->title_en;
            $data['posts'][$i]['category_ru'] = $category->title_ru;
            $data['posts'][$i]['category_uz'] = $category->title_uz;
            $i++;
        }
        $data['sidebar'] = $this->sidebar();
        return $data;
    }

    public function get_tag_posts($id)
    {
        $tag = Tag::where('id', $id)->firstOrFail();
        $posts = $tag->posts()->get();
        if (count($posts) < 1) return response()->json(["Message" => "Posts not found"], 400);
        $i = 0;
        foreach ($posts as $post) {
            $data['posts'][] = $post;
            $category = Category::find($post->category_id);
            $data['posts'][$i]['category_en'] = $category->title_en;
            $data['posts'][$i]['category_ru'] = $category->title_ru;
            $data['posts'][$i]['category_uz'] = $category->title_uz;
            $i++;
        }
        $data['sidebar'] = $this->sidebar();
        return $data;
    }
}
