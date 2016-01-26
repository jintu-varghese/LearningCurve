! function (a) {
    var b = {
        init: function (c) {
            var d = this
                , e = {
                    getCommentsUrl: null
                    , postCommentUrl: null
                    , deleteCommentUrl: null
                    , localization: {
                        headerText: "Comments"
                        , commentPlaceHolderText: "Add a comment..."
                        , sendButtonText: "Send"
                        , replyButtonText: "Reply"
                        , deleteButtonText: "Delete"
                    }
                    , callback: {
                        beforeDelete: function () {
                            return !0
                        }
                        , afterDelete: function () {}
                        , beforeCommentAdd: function () {
                            return !0
                        }
                        , afterCommentAdd: function () {}
                        , beforeRefresh: function () {}
                        , afterRefresh: function () {}
                        , onGetError: function () {}
                        , onPostError: function () {}
                    }
                    , displayHeader: !0
                    , displayCount: !0
                    , loadWhenVisible: !1
                    , readOnly: !1
                    , displayAvatar: !1
                };
            if (c = a.extend(!0, {}, e, c), this.data("data", {
                    options: c
                }), this.addClass("commentsBlock"), c.displayHeader) {
                var f = "<div class='heading'><h4>" + c.localization.headerText;
                c.displayCount && (f += ' (<span data-action="count"></span>) '), f += "</h4> <div class='loadingIndicator'></div><div class=\"clearFix\"></div></div>", this.append(f)
            }
            
            c.readOnly || this.append('<div class="newComment"><form enctype="multipart/form-data"><textarea placeholder="' + c.localization.commentPlaceHolderText + '" name="comment" maxlength="2500"></textarea>' + '<a href="javascript:void(0)" class="btn sendComment" data-action="send"><span>' + c.localization.sendButtonText + "</span></a>" + "</form>" + "</div>"), this.append('<ul class="comments"></ul>');
            var g = this.find(".newComment")
                .find("textarea")
                , h = g.parent()
                .find("[data-action='send']");
            if (h.hide(), g.focusout(function () {
                    0 == a.trim(a(this)
                            .val())
                        .length && (h.hide(), a(this)
                            .val(""))
                }), g.focus(function () {
                    h.show()
                }), h.bind("click", function () {
                    var c = a(this)
                        .parents("form")
                        , e = g.val();
                    if (a.trim(e)
                        .length > 0) {
                        var f = c.serialize();
                        b.postComment.call(d, f), g.val(""), h.hide()
                    }
                }), c.loadWhenVisible) {
                var i = d.offset()
                    .top
                    , j = i + d.height()
                    , k = a(window)
                    .scrollTop();
                j <= k + a(window)
                    .height() && i >= k ? b.refresh.call(d) : a(window)
                    .bind("scroll", function () {
                        k = a(window)
                            .scrollTop(), j <= k + a(window)
                            .height() && i >= k && (a(window)
                                .unbind("scroll"), b.refresh.call(d))
                    })
            } else b.refresh.call(d)
        }
        , count: function () {
            var a = this;
            return a.find(".comment")
                .length
        }
        , refresh: function () {
            var c = this
                , d = c.find(".loadingIndicator");
            d.show();
            var e = this.data()
                .data.options;
                
            e.callback.beforeRefresh(), a.getJSON(e.getCommentsUrl, function (f) {
                    c.find(".comments")
                        .empty(), a.each(f, function (a, d) {
                       

                            b.bindComment.call(c, d)
                        }), b.bindEvents.call(c), d.hide(), c.find(".heading h4 [data-action='count']")
                        .html(c.find(".comment")
                            .length), e.callback.afterRefresh()
                })
                .fail(function () {
                alert('getJSON fail for:' + e.getCommentsUrl);
                    d.hide(), e.callback.onGetError()
                })
        }
        , postComment: function (c) {
            var d = this
                , e = d.data()
                .data.options;
            if (e.callback.beforeCommentAdd()) {
                var f = d.find(".loadingIndicator");
                f.show(), a.post(e.postCommentUrl, c, function (a) {
                        f.hide(), b.bindComment.call(d, a), b.bindEvents.call(d), d.find(".heading h4 [data-action='count']")
                            .html(d.find(".comment")
                                .length), e.callback.afterCommentAdd(a.Id)
                    })
                    .fail(function () {
                        f.hide(), e.callback.onPostError()
                    })
            }
        }
        , bindComment: function (a) {
        alert(1);
            var b, c = this.data()
                .data.options;
            null != a.ParentId ? (b = this.find("[data-commentid=" + a.ParentId + "]"), 0 == b.find(".reply_comments")
                .length && b.append("<div class='reply_comments'><ul class='comments'></ul></div>"), b = b.children(".reply_comments")
                .children(".comments")) : b = this.children(".comments"), null != a.Comment && (a.Comment = a.Comment.replace("<script>", "")
                .replace("</script>", ""));
            var d = "<li class='comment' data-commentId='" + a.Id + '\'><div class="commentContent">';
            c.displayAvatar ? (d += '<div class="avatar">', d += null != a.UserAvatar ? '<img src="' + a.UserAvatar + '" />' : '<div class="defaultAvatar"></div>', d += '</div><div class="content avatarPadding">') : d += '<div class="content">', d += "<p class='info'><span class='author'>" + a.Author + "</span>" + "</p>" + "<p class='commentText'>" + a.Comment + "</p>" + "<p class='info'><time>" + a.Date + "</time>", c.readOnly || ("boolean" != typeof a.CanReply || a.CanReply) && (d += "<a href='javascript:void(0)' data-action='replay'>" + c.localization.replyButtonText + "</a>"), !c.readOnly && "boolean" == typeof a.CanDelete && a.CanDelete && (d += "<a href='javascript:void(0)' data-action='delete'>" + c.localization.deleteButtonText + "</a>"), d += "</p></div></div></li>", b.prepend(d)
        }
        , bindEvents: function () {
            var c = this
                , d = c.data()
                .data.options;
            a('[data-action="replay"]')
                .unbind()
                .bind("click", function () {
                    b.startCommentReplay.call(c, a(this))
                }), a('[data-action="delete"]')
                .unbind()
                .bind("click", function () {
                    if (d.callback.beforeDelete(a(this)
                            .parents("li.comment")
                            .data("commentid"))) {
                        var b = c.find(".loadingIndicator");
                        b.show(), a.post(d.deleteCommentUrl, {
                            commentId: a(this)
                                .parents("li.comment")
                                .data("commentid")
                        }, function (e) {
                            a("[data-commentid=" + e + "]")
                                .remove(), c.find(".heading h4 [data-action='count']")
                                .html(c.find(".comment")
                                    .length), b.hide(), d.callback.afterDelete(e)
                        })
                    }
                })
        }
        , startCommentReplay: function (c) {
            var d = this
                , e = this.data()
                .data.options
                , f = a(c)
                .parents("li.comment");
            a(c)
                .parent()
                .after("<div class='contentBlockCommentAdd'><form enctype='multipart/form-data'><textarea cols='20' placeholder='" + e.localization.commentPlaceHolderText + "' rows='2' name='comment' maxlength='2500'></textarea>" + "<a href='javascript:void(0)' class='btn sendComment' data-action='send'><span>" + e.localization.sendButtonText + "</span></a>" + "</form>" + "</div>"), a(c)
                .hide();
            var g = a(f)
                .find("textarea");
            g.focus(), g.focusout(function () {
                    a(this)
                        .removeClass("focused"), 0 == a.trim(a(this)
                            .val())
                        .length && (f.find(".contentBlockCommentAdd")
                            .remove(), a(this)
                            .val(""), a(c.show()))
                }), f.find('[data-action="send"]')
                .bind("click", function () {
                    var e = a(this)
                        .parent()
                        , g = e.find("textarea")
                        .val();
                    if (0 != a.trim(g)
                        .length) {
                        var h = e.serialize();
                        h += "&parentId=" + f.data("commentid"), b.postComment.call(d, h)
                    }
                    a(c.show()), f.find(".contentBlockCommentAdd")
                        .remove()
                })
        }
    };
    a.fn.comments = function (c) {
        return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? (a.error("Method " + c + " doesn not exists in jQuery.comments"), null) : b.init.apply(this, arguments)
    }
}(jQuery);
