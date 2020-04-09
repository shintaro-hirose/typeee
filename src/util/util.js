export const timeFormatting = (ms) => {
    let s = ms / 1000;
    if(s >= 60){
        let m = Math.floor(s / 60)
        s = s % 60;
        return m + ':' + s.toFixed(2)
    } else {
        return s.toFixed(2)
    }
}

export const cpmToRank = (cpm) => {
    if(cpm>=600){
        return "地球外生命体";
    } else if(cpm >= 500){
        return "よく訓練されたプロ";
    } else if(cpm >= 430){
        return "経験を積んだプロ"
    } else if(cpm >= 375){
        return "プロ並み"
    } else if(cpm >= 330){
        return "セミプロ"
    } else if(cpm >= 285){
        return "よく訓練された一般人"
    } else if(cpm >= 240){
        return "ちょっと速い一般人"
    } else if(cpm >= 200){
        return "平均レベル"
    } else if(cpm >= 150){
        return "平均よりちょっと下"
    } else if(cpm >= 100){
        return "亀さんレベル"
    } else{
        return "原始人レベル"
    }
}

export const cpmToDiscription = (cpm) => {
    if(cpm>=600){
        return "全く、脱帽しました。あなたの手の指は何本あるのでしょう？もしかしたら10本より多くあるかもしれません。";
    } else if(cpm >= 500){
        return "素晴らしい！あなたは世界レベルのタイピストです。いまこそ世界にその存在を知らしめるのです！";
    } else if(cpm >= 430){
        return "なんということでしょう！どういうわけかあなたはプロの中でも速い方になってしまいました！あなたなら世界も狙えるはずです！"
    } else if(cpm >= 375){
        return "「プロフェッショナル」といったいどれだけの人が呼ばれることができるでしょう？あなたはこの結果を今すぐに自慢するべきです！"
    } else if(cpm >= 330){
        return "アマチュアとプロの違いは何でしょうか？その違いが分かればもっと上を目指せるかもしれません。"
    } else if(cpm >= 285){
        return "学校や職場ではかなり速いほうでしょう。でも忘れてはいけません。上には上がいるのです！"
    } else if(cpm >= 240){
        return "友達にタイピングの勝負でも挑みますか？気をつけてください。かなりの確率で負けるかもしれません。"
    } else if(cpm >= 200){
        return "何も言うことはありません。だって凡人なのだから。"
    } else if(cpm >= 150){
        return "もっと速くなりたい？楽しいことをおっしゃいますね。そのレベルにまで達していませんから。"
    } else if(cpm >= 100){
        return "まずは両手のホームポジションを学びましょう。基礎を固めると成長が速くなるはずです。"
    } else{
        return "原始人ならば、、、仕方がないですね。まずは現代の文明に慣れることです"
    }
}