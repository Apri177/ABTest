package com.abtest.first;

import java.util.List;

public interface BoardPictureRepository extends CrudRepository <BoardPicture, Integer> {
    BoardPicture save(BoardPicture boardPicture);

    List<BoardPicture> findAllByBoardIdx(Integer boardIdx);

}
