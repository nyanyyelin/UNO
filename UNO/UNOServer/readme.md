**UNO Team k Server**


**Set up development environment**
``` 
npm install
npm start
```

**Used libraries/frameworks**
- Node.js
- Express
- Font Awesome

**Rule**

```

	Must have at least two players. Start by dealing 7 cards for each player. The first card from the pill is placed in the center. If the card player has a similar number or similar color or type of the card, then the player discards to pile. If the player wants to change the color of the card they can use the wild card. 

	Not implemented but in the actual game when the player is down to one they should say UNO before any one noticed it. 

	The player who play all the cards win. 

	
	The skip card: Skips the next player.
	
	The reverse card: reverse the direction of the play
	The draw +2 card: force the next player to add two cards in their hand
	The draw +4 card: force the next player to add four cards in their hand
	The wild card: change the color being played at any color
	

card type: 

	 [
            'r0','r1','r2','r3','r4','r5','r6','r7','r8','r9','rp','rn','rr',
            'g0','g1','g2','g3','g4','g5','g6','g7','g8','g9','gp','gn','gr',
            'b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','bp','bn','br',
            'y0','y1','y2','y3','y4','y5','y6','y7','y8','y9','yp','yn','yr',
            'kg','kc','kg','kc'
     ]

     Each element has two chars. The first represents the color of the card, and the second is the numbers.
```