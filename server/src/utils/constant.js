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
  0: "未知",
  1: "可能是骗子！",
  2: "骗子！！",
  3: "百分百骗子！！！",
  4: "回头是岸！！！！",
};

const NAME_INFO = process.env.NODE_ENV
  ? {
      q: "qiqi",
      m: "muqin",
      y: "yuequ",
    }
  : {
      q: "\u4e03\u4e03",
      m: "\u6728\u7434",
      y: "\u7ca4\u533a",
    };

module.exports = { template, RESULT_STATUS, NAME_INFO };
