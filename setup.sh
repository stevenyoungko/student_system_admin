echo '=== Add Remote' $1 $2;
git remote add $1 $2
echo '=== Check Remote';
git remote -v
echo "=== Checkout origin/master ==="
git checkout master
echo "=== Push to New Repo ==="
git push $1 master
echo "=== Admin Setup Success ヽ(・×・´)ゞ==="
git remote remove $1