@echo off
cd /d D:\Projects\Chat_Log_Dev
git add .
set /a RND=2*%random%/32768
git commit -m %RND%
git push