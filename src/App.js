import React from 'react';
import './App.css';

// component to show a post
function Posts(props) {
	const {
		deletePost,
		update,
		viewOne,
		postTitle,
		time,
		postContent,
		index,
		defaultState,
		id,
	} = props;
	return (
		<div className='post'>
			<div className='post-header'>
				<p className='post-title'>{postTitle}</p>
				<p className='post-date'>
					{defaultState === true ? <i>edited </i> : ''}
					{time}
				</p>
			</div>
			<div className='post-content'>{postContent}</div>
			<div className='post-options'>
				<p className='view-post' onClick={() => viewOne(id)}>
					View post
				</p>
				<p className='edit-post' onClick={() => update(index)}>
					Edit
				</p>
				<p className='delete-post' onClick={() => deletePost(index)}>
					Delete
				</p>
			</div>
		</div>
	);
}

// to assign ids to posts
let postId = 1;

function App() {
	const [titleValue, setTitleValue] = React.useState('');
	const [contentValue, setContentValue] = React.useState('');
	const [posts, setPosts] = React.useState([]);
	const [viewModal, setViewModal] = React.useState(false);
	const [viewAllBool, setViewAllBool] = React.useState(false);
	// state variable to check if index already exists...for editing posts
	const [checkIndex, setCheckIndex] = React.useState(null);
	// state variable to store data for view one post in modal
	const [singlePost, setSinglePost] = React.useState({});

	// function for post
	function post() {
		if (titleValue !== '' && contentValue !== '') {
			if (checkIndex !== null) {
				setPosts((previous) =>
					previous.map((item, index) => {
						return checkIndex === index
							? {
									postTitle: titleValue,
									postContent: contentValue,
									time: new Date().toLocaleTimeString(),
									id: item.id,
									defaultState: true,
							  }
							: {
									postTitle: item.postTitle,
									postContent: item.postContent,
									time: item.time,
									id: item.id,
									defaultState: item.defaultState,
							  };
					})
				);
			} else {
				setPosts((previous) => [
					...previous,
					{
						postTitle: titleValue,
						postContent: contentValue,
						time: new Date().toLocaleTimeString(),
						id: postId,
						defaultState: false,
					},
				]);
			}
			setCheckIndex(null);
			setTitleValue('');
			setContentValue('');
		} else {
			alert('Title and Content fields cannot be empty');
		}

		postId = postId + 1;
	}

	// function to delete post
	function deletePost(index) {
		posts.splice(index, 1);
		setPosts([...posts]);
	}

	// function to edit and update post
	function update(index) {
		setTitleValue(posts[index].postTitle);
		setContentValue(posts[index].postContent);
		setCheckIndex(index);
	}

	// function to toggle modal
	function toggleModal() {
		setViewModal(!viewModal);
	}

	// function to view one post
	function viewOne(id) {
		console.log(id);
		toggleModal();
		const singlePostObject = posts.find((post) => post.id === id);
		setSinglePost(singlePostObject);
	}

	// function to view all
	function viewAll() {
		setViewAllBool(!viewAllBool);
		// posts.reverse();
		setPosts([...posts]);
	}

	// function to sort by time
	function sortedPosts() {
		return posts.sort((a, b) => a.time < b.time);
	}

	// function to handle text in the input box
	function handleTitleValue(event) {
		setTitleValue(event.target.value);
	}
	// function to handle text in the textarea box
	function handleContentValue(event) {
		setContentValue(event.target.value);
	}

	// function to render all posts in the post array
	function renderPosts(post, index) {
		return (
			<Posts
				key={post.id}
				index={index}
				postContent={post.postContent}
				postTitle={post.postTitle}
				time={post.time}
				deletePost={deletePost}
				update={update}
				viewOne={viewOne}
				defaultState={post.defaultState}
				id={post.id}
			/>
		);
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Welcome to Post</h1>
			</header>
			<main>
				<div className='input-section'>
					<div className='stack'>
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							id='title'
							placeholder='Title of post'
							name='content'
							value={titleValue}
							onChange={handleTitleValue}
						/>
						<label htmlFor='content'>Content</label>
						<textarea
							name='content'
							id='content'
							cols='30'
							rows='10'
							value={contentValue}
							onChange={handleContentValue}
						></textarea>
					</div>
					<button onClick={post}>Post</button>
				</div>
			</main>
			<section>
				<div className='posts'>
					{viewAllBool
						? sortedPosts().map(renderPosts)
						: sortedPosts().slice(0, 2)
								.map(renderPosts)}
				</div>
				{posts.length > 2 && !viewAllBool && <button onClick={viewAll}>View All</button>}
				{posts.length > 2 && viewAllBool && <button onClick={viewAll}>View Less</button>}
			</section>
			{viewModal && (
				<div className='modal'>
					<div className='modal-content'>
						<div className='stack' style={{ display: 'block' }}>
							<div className='post-header'>
								<p className='post-title'>{singlePost.postTitle}</p>
								<p className='post-date'>
									{singlePost.defaultState === true ? <i>edited </i> : ''}
									{singlePost.time}
								</p>
							</div>
							<div className='post-content' style={{ display: 'block' }}>
								{singlePost.postContent}
							</div>
						</div>
						<button onClick={toggleModal}>Close</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
