const db = require('../connection');


exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.checkIfArticleExist=(id)=>{
  return db.query(`SELECT * FROM articles WHERE article_id =$1;`, [id]).then((result)=>{
  const article=result.rows[0];
    if(article){
      return true;
    }
    return Promise.reject({status:404, msg: 'not found'})
  })
}

exports.checkIfCommentExist=(id)=>{
  return db.query(`SELECT * FROM comments WHERE comment_id =$1;`, [id]).then((result)=>{
  const comment=result.rows[0];
    if(comment){
      return true;
    }
    return Promise.reject({status:404, msg: 'not found'})
  })
}
