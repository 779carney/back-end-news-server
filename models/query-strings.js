
exports.getArticleByIdQuery = `SELECT * FROM articles WHERE article_id = $1;`

exports.getArticlesInDateOrderQuery = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;`
;
exports.getCommentsByIdQuery = `SELECT * FROM comments WHERE  article_id = $1;`

exports.postInsertCommentQuery = `INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) returning *`

exports.patchVotesQuery =`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 returning *;`
