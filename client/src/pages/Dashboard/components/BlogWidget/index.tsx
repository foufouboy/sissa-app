import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import "./index.sass";
import { blogPosts } from "@/shared/utils/mockData";
import { truncateString } from "@/shared/utils/utils";

function BlogWidget() {
	const { recentPosts } = blogPosts;

	return (
		<GenericCard title="Articles récents" className="blog-widget">
			<div className="generic-card-content">
				<div className="blog-posts-list">
					{recentPosts.map((post) => (
						<div key={post.id} className="blog-post-item">
							<div className="blog-post-header">
								<h4 className="blog-post-title">
									{post.title}
								</h4>
								{post.featured && (
									<span className="blog-post-badge">
										En vedette
									</span>
								)}
							</div>
							<p className="blog-post-excerpt">
								{truncateString(post.excerpt, 100)}
							</p>
							<div className="blog-post-meta">
								<span className="blog-post-author">
									{post.author}
								</span>
								<span className="blog-post-separator">
									•
								</span>
								<span className="blog-post-read-time">
									{post.readTime} min de lecture
								</span>
							</div>
						</div>
					))}
				</div>
				<GenericButton className="generic-button-primary">
					Voir plus
				</GenericButton>
			</div>
		</GenericCard>
	);
}

export default BlogWidget;
