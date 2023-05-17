const template = `
<xml>
 <ToUserName><![CDATA[<%-toUsername%>]]></ToUserName>
 <FromUserName><![CDATA[<%-fromUsername%>]]></FromUserName>
 <CreateTime><%=createTime%></CreateTime>
 <MsgType><![CDATA[<%=msgType%>]]></MsgType>
 <% if (msgType === 'news') { %>
 <ArticleCount><%=content.length%></ArticleCount>
 <Articles>
 <% content.forEach(function(item){ %>
 <item>
 <Title><![CDATA[<%-item.title%>]]></Title>
 <Description><![CDATA[<%-item.description%>]]></Description>
 <PicUrl><![CDATA[<%-item.picUrl || item.picurl || item.pic || item.thumb_url %>]]></PicUrl>
 <Url><![CDATA[<%-item.url%>]]></Url>
 </item>
 <% }); %>
 </Articles>
 <% } else if (msgType === 'music') { %>
 <Music>
 <Title><![CDATA[<%-content.title%>]]></Title>
 <Description><![CDATA[<%-content.description%>]]></Description>
 <MusicUrl><![CDATA[<%-content.musicUrl || content.url %>]]></MusicUrl>
 <HQMusicUrl><![CDATA[<%-content.hqMusicUrl || content.hqUrl %>]]></HQMusicUrl>
 </Music>
 <% } else if (msgType === 'voice') { %>
 <Voice>
 <MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>
 </Voice>
 <% } else if (msgType === 'image') { %>
 <Image>
 <MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>
 </Image>
 <% } else if (msgType === 'video') { %>
 <Video>
 <MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>
 <Title><![CDATA[<%-content.title%>]]></Title>
 <Description><![CDATA[<%-content.description%>]]></Description>
 </Video>
 <% } else { %>
 <Content><![CDATA[<%-content%>]]></Content>
 <% } %>
</xml>
`;

const RESULT_STATUS = {
  0: "\u672a\u77e5", // 未知
  1: "\u53ef\u80fd\u662f\u9a97\u5b50\uff01", // 可能是！
  2: "\u9a97\u5b50\uff01\uff01", // 是！！
  3: "\u767e\u5206\u767e\u9a97\u5b50\uff01\uff01\uff01", // 百分百！！！
  4: "\u56de\u5934\u662f\u5cb8\uff01\uff01\uff01\uff01", // 回头是岸！！！！
};

const NAME_INFO = process.env.NODE_ENV
  ? {
      q: "qiqi：",
      m: "muqin：",
      y: "yuequ：",
    }
  : {
      q: "\u4e03\u4e03\uff1a",
      m: "\u6728\u7434\uff1a",
      y: "\u7ca4\u533a\uff1a",
    };

const msg = {
  attendion:
    "您好，谢谢您的关注！输入uid(复制uid的整串文字)即可进行查询（暂不支持wx，qq），如有包含骗子字段，请注意防骗！如未回复，说明没有收录，但是最快会在24小时内进行更新。发送“投稿”即可获取联系方式进行投稿！",
  other:
    "暂时不支持该消息格式，如果您有好的建议或者想法，请联系管理员，也许会在将来的某一天实现！(v:zcb99735)",
  contribute:
    "v: zcb99735。感谢您对公众号的支持，有好的想法可以一起交流，对公众号有不满意的也可以尽管说，俺也会努力改正的！",
};
module.exports = { template, RESULT_STATUS, NAME_INFO, msg };
