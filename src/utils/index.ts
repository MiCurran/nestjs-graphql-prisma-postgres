import { Player } from "src/player/player";
type Game = {
    createdAt: string,
    updatedAt: string,
    player1Id: number, 
    player2Id: number,
    isActive: boolean,
    gameWinner: number
}
interface IGameRes {
    FindGameById: Partial<Game>
    ListAllGames: Partial<Game>[]
}
export const GAME_SERVICE_CALL = async (query: string, variables?: {}): Promise<IGameRes> => {
    let results = await fetch(`${process.env.GAME_SERVICE_URL}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: query, variables: variables
        })
      })
      let res = await results.json();
      console.log(res.data)
      return res.data;
}

export const isGameActive = async (gameId) => {
    const query = `query($gameId: Int!){
        FindGameById(id: $gameId){
            player1Id
            player2Id
            isActive
          }
    }`
    const gameCall = await GAME_SERVICE_CALL(query, {gameId: gameId})
    return gameCall.FindGameById.isActive
  }