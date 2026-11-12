import re
R = r'C:\Projects\myprojects\webdevpuneet'
moves = {
    'spin-wheel': 'tools',
    'dice-roller': 'tools',
    'coin-flip': 'tools',
    'quiz-card': 'cards',
    'bubble-wrap-popper': 'animations',
}
for sid, cat in moves.items():
    p = R + r'\src\components\UiSnippetsTool\snippets\%s.js' % sid
    s = open(p, encoding='utf-8').read()
    s2, n = re.subn(r"category: 'games'", "category: '%s'" % cat, s, count=1)
    assert n == 1, sid
    s2, n2 = re.subn(r"lastmod: '[0-9-]+'", "lastmod: '2026-11-12'", s2, count=1)
    assert n2 == 1, sid
    open(p, 'w', encoding='utf-8').write(s2)
    print('moved', sid, '->', cat)

# Patreon-only list: remove the five
p = R + r'\src\lib\patreon-settings.js'
s = open(p, encoding='utf-8').read()
for sid in moves:
    line = "  '%s',\n" % sid
    assert s.count(line) == 1, sid
    s = s.replace(line, '')
s = s.replace('(all 71)', '(all 66)')
open(p, 'w', encoding='utf-8').write(s)

# game genres
p = R + r'\src\lib\game-genres.js'
s = open(p, encoding='utf-8').read()
for sid in moves:
    s, n = re.subn(r"'%s',\s*" % re.escape(sid), '', s, count=1)
    assert n == 1, sid
open(p, 'w', encoding='utf-8').write(s)

# tag map: drop the "games" tag for the ones that carried it
p = R + r'\src\lib\snippet-tag-map.js'
s = open(p, encoding='utf-8').read()
for sid in ['coin-flip', 'dice-roller', 'quiz-card', 'bubble-wrap-popper']:
    m = re.search(r"  '%s': \[([^\]]*)\]," % re.escape(sid), s)
    assert m, sid
    tags = [t.strip() for t in m.group(1).split(',') if t.strip() and t.strip() != "'games'"]
    s = s.replace(m.group(0), "  '%s': [%s]," % (sid, ', '.join(tags)))
open(p, 'w', encoding='utf-8').write(s)
print('done')
