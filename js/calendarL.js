// 2015.9.6 by liumingren
$(function(){
    function Calendar(e) {
        this.date = e ? new Date(+e) : new Date;
        this.lesson = {
            1: "语文",
            2:"数学",
            3:"化学"
        }
    }
    Calendar.prototype = {
        getMonthFirstDate: function() {
            var e = new Date(+this.date);
            return e.setDate(1), e
        },
        getCalendarFirstDate: function() {
            var e = this.getMonthFirstDate(),
                t = e.getDay(),
                n = [-6, 0, -1, -2, -3, -4, -5];
            return e.setDate(e.getDate() + n[t]), e
        },
        getCalendarSundayFirstDate: function() {
            var e = this.getMonthFirstDate(),
                t = e.getDay(),
                n = [0, -1, -2, -3, -4, -5, -6];
            return e.setDate(e.getDate() + n[t]), e
        },
        getCalendarMonthRowCount: function() {
            var e = new Date(+this.date);
            e.setDate(1);
            var t = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                n = e.getFullYear(),
                r = e.getMonth(),
                i = e.getDay();
            return r != 1 || i != 1 || n % 4 == 0 && n % 100 != 0 || n % 400 == 0 ? i == 6 && t[r] == 31 || i == 0 && t[r] >= 30 ? 6 : 5 : 4
        },
        getCalendarCellData: function() {
            var n = this.getCalendarSundayFirstDate(this.date),u,o=[],row = this.getCalendarMonthRowCount()*7;
            for (var l = 0; l < row; l++) {
                var h = new Date(n.getTime() + 864e5 * l);
                u = h.getFullYear()+"/"+(h.getMonth()+1)+"/"+h.getDate();
                o.push(u);
            }
            return o
        },
        creatCalendar:function () {
            var list = this.getCalendarCellData(),html=[],self = this;
            html.push("<ul>");
            $.map(list, function (_,i) {
                var d = new Date(_),
                    w = d.getDay(),//当前是星期几
                    l = self.lesson[w]||"",//当前的课程
                    c;//class
                if($.inArray(w,[1,2,3])) {//如果是周一周二周三

                }
                if(1){//根据条件设置class
                    c = "class="+"";
                }
                html.push("<li>"+d.getDate()+ (l !="" ? "<span "+c+">"+l+"</span>":"")+"</li>")
            });
            html.push("</ul>");
            return html.join("");
        }
    }
    // 生成日历
    function init(d){
        var c = new Calendar(d);
        var html = c.creatCalendar();
        $("#cal").html(html);
        $("#cal").data("date",d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate());
        $(".date").text(d.getFullYear()+"年"+(d.getMonth()+1)+"月")
    }
    
    // 切换月
    function switchMonth(dvalue) {
        $("#cal").html("");
        var d = new Date($("#cal").data("date"));
        d.setMonth(d.getMonth()+dvalue);
        init(d);
    }

    $(".prev").click(function () {
        switchMonth(-1);
    })
    $(".next").click(function () {
        switchMonth(+1);
    })


    init(new Date());
})