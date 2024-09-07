import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useLoginAccess } from "../context/LoginAccess"

interface Reactions {
    like: number,
    wow: number,
    love: number,
    haha: number,
    sad: number,
    angry: number
}
interface FollowerResponse {
    followers_count: number
}
interface PagesResponse {
    data: [
        {
            id: string
        }
    ]
}
interface ReactionResponse {
    data: [
        {
            likes: {
                summary: {
                    total_count: number
                }
            },
            reactions_love: {
                summary: {
                    total_count: number
                }
            },
            reactions_wow: {
                summary: {
                    total_count: number
                }
            },
            reactions_haha: {
                summary: {
                    total_count: number
                }
            },
            reactions_sad: {
                summary: {
                    total_count: number
                }
            },
            reactions_angry: {
                summary: {
                    total_count: number
                }
            },
        }
    ]
}
export default function PageInfo () {
    const {pageAccessToken} = useLoginAccess();
    const {accessToken} = useLoginAccess();
    const {pageId} = useParams()
    const [followers, setFollowers] = useState<number>()
    const [postId, setPostId] = useState('');
    const [reactions, setReactions] = useState<Reactions>({
        like: 0,
        wow: 0,
        love: 0,
        haha: 0,
        sad: 0,
        angry: 0
    })
    useEffect(()=> {
        window.FB.api(
            `${pageId}?fields=followers_count.limit(0).summary(true)`,
            'get',
            {access_token: accessToken},
            function(response: FollowerResponse) {
                setFollowers(response.followers_count)
            }
          );

          window.FB.api(
            `${pageId}/feed`,
            'get',
            {access_token: pageAccessToken},
            function(response: PagesResponse) {
                setPostId(response.data[0].id)
            }
          );
    },[])
    useEffect(()=> {
        window.FB.api(
            `${pageId}/feed?fields=shares,likes.summary(true),reactions.type(LOVE).limit(0).summary(total_count).as(reactions_love) ,reactions.type(WOW).limit(0).summary(total_count).as(reactions_wow), reactions.type(SAD).limit(0).summary(total_count).as(reactions_sad), reactions.type(HAHA).limit(0).summary(total_count).as(reactions_haha), reactions.type(ANGRY).limit(0).summary(total_count).as(reactions_angry) &limit=1`,
            'get',
            {access_token: pageAccessToken},
            function(response: ReactionResponse) {
                setReactions({
                    like: response.data[0].likes.summary.total_count,
                    wow: response.data[0].reactions_wow.summary.total_count,
                    love: response.data[0].reactions_love.summary.total_count,
                    haha: response.data[0].reactions_haha.summary.total_count,
                    sad: response.data[0].reactions_sad.summary.total_count,
                    angry: response.data[0].reactions_angry.summary.total_count
                })
            }
          );
    },[postId])
    return (
        <div id="page-info">
            <div className="container">
                <p className="page_id">Page_id - {pageId}</p>
                <div>followers - {followers}</div>
                <div>
                    <h5>Reactions</h5>
                    <p>Likes - {reactions.like}</p>
                    <p>WoW - {reactions.wow}</p>
                    <p>Love - {reactions.love}</p>
                    <p>haha - {reactions.haha}</p>
                    <p>sad - {reactions.sad}</p>
                    <p>angry - {reactions.angry}</p>
                    <p>Total - {reactions.like + reactions.love + reactions.wow + reactions.haha + reactions.sad + reactions.angry}</p>
                </div>
            </div>
        </div>
    )
}