// 追加メソッドを定義
const onClickAdd = () => {
  // 入力値を取得
  const inputText = document.getElementById('add-text').value;
  // 入力内容を初期化
  document.getElementById('add-text').value = '';

  createImcompleteTodo(inputText);
};

// 渡された引数を基に未完了のTODOを作成する
const createImcompleteTodo = (todo) => {
  if (todo === '') {
    return;
  }

  // li生成
  const li = document.createElement('li');

  // div生成
  const div = document.createElement('div');
  div.className = 'list-row';

  // p生成
  const p = document.createElement('p');
  p.className = 'todo-item';
  p.innerText = todo;

  // complete-botton生成
  const completeButton = document.createElement('button');
  completeButton.innerText = '完了';
  completeButton.addEventListener('click', () => {
    // 押された完了ボタンの親にあるliタグを未完了リストから完了リストへ移動
    const moveTarget = completeButton.closest('li');
    completeButton.nextElementSibling.remove();
    completeButton.remove();

    // back-button生成
    const backButton = document.createElement('button');
    backButton.innerText = '戻す';
    backButton.addEventListener('click', () => {
      const todoText = backButton.previousElementSibling.innerText;
      createImcompleteTodo(todoText);
      backButton.closest('li').remove();
    });
    moveTarget.firstElementChild.appendChild(backButton);

    document.getElementById('complete-list').appendChild(moveTarget);
  });

  // delete-button生成
  const deleteButton = document.createElement('button');
  deleteButton.innerText = '削除';
  deleteButton.addEventListener('click', () => {
    // 押された削除ボタンの親にあるliタグを未完了リストから削除
    const deleteTarget = deleteButton.closest('li');
    document.getElementById('incomplete-list').removeChild(deleteTarget);
  });

  // 階層指定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  // 追加処理
  document.getElementById('incomplete-list').appendChild(li);
};

// 追加ボタン押下時のイベントを設定
document.getElementById('add-button').addEventListener('click', onClickAdd);
