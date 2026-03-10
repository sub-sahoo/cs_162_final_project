const frames = [
  {
    template: "title",
    title: "40 acres and a mule",
    subtitle: "A promise to black families left unkempt.",
    attribution: "A data story by Sub, Maddy, Pearl, and Sayuj",
    image: "assets/frame1.png"
  },
  {
    template: "card",
    image: "assets/frame2.png",
    body: "Wartime Order No. 15 was proclaimed by Union general William Sherman in 1865 during the American Civil War, to allot 400,000 acres to 18,000 formerly enslaved families in parcels of at most 40 acres of land. This land was across Georgia, South Carolina, and Florida. The promise was reversed by President Johnson."
  },
  {
    template: "split",
    title: "Present Day",
    // image: 'assets/placeholder.png',
    placeholderText: "wage graph today between black and white families",
    body: "Black families make $0.15 cents for every $1 dollar a White family earns. How did we get here?"
  },
  {
    template: "card",
    title: "What if this promise was kept?",
    body: "We will model 18,000 black families and 18,000 white families in South Carolina through time and their respective wealth channels in our scenario of 40 acres and a mule compared to what happened in our history."
  },
  {
    template: "card",
    title: "1865",
    body: `
<p><u>Reconstruction policies</u>: Freedmen briefly gained political representation and some economic opportunities, but land redistribution largely failed.</p>

<p><u>Rise of sharecropping</u>: Without land ownership, many Black families entered exploitative sharecropping contracts that trapped them in cycles of debt.</p>
`
  },
  {
    template: "card",
    image: "assets/frame6.png",
    body: "During this time in our history: Black wages remain extremely low and unstable. Wealth accumulation is nearly impossible, and the wealth gap solidifies early.",
    wage: 1
  },
  {
    template: "card",
    image: "assets/frame7.png",
    body: "In our scenario, land ownership prevents dependence on sharecropping. Early wealth accumulation begins, and the Black wealth line rises modestly instead of remaining flat.",
    wage: 1
  },
  {
    template: "card",
    image: "assets/frame8.png",
    body: `
Simulation Statistics:

<b>White Families</b>
<ul>
<li> Starting Acres: 230 </li>
<li> Loan Rate: 10%</li>
<li> Investment Exposure:</li>
</ul>
<b>Black Families</b>
<ul>
<li> Starting Acres: 40 </li>
<li> Loan Rate: 2%</li>
<li> Investment Exposure:</li> 
</ul>`, //TODO: add investment exposure stat
    wage: 1
  },
  {
    template: "card",
    title: "1910s-20s",
    body: `
<p><u>Great Migration</u>: Over 6 million Black Americans move from the rural South to the North and West seeking industrial jobs and higher wages.</p>

<p><u>Tulsa Race Massacre and racial violence</u>: The Tulsa Race Massacre was when, in June 1921, mobs of white supremacist terrorists attacked black residents of Tulsa, Oklahoma, and destroyed homes and businesses in the wealthiest black community in the US at the time.</p>
`
  },
  {
    template: "card",
    image: "assets/frame10.png",
    body: "During this time in our history: Black wages rise modestly due to industrial work, but wealth remains fragile and vulnerable to racial violence. The gap narrows slightly in wages but not in assets.",
    wage: 1
  },
  {
    template: "card",
    image: "assets/frame11.png",
    body: "In our scenario: Families with inherited land capital have the financial resources to invest in businesses, take out loans, and rebuild more easily after violence. The wealth line rises faster and is less fragile.",
    wage: 1
  },
  {
    template: "card",
    image: "assets/frame12.png",
    body: `
Simulation Statistics:

<b>White Families</b>
<ul>
<li> Starting Acres: 230 </li>
<li> Loan Rate: 10%</li>
<li> Investment Exposure:</li>
</ul>
<b>Black Families</b>
<ul>
<li> Starting Acres: 40 </li>
<li> Loan Rate: 2%</li>
<li> Investment Exposure:</li> 
</ul>`, //TODO: add investment exposure stat
    wage: 1
  },
  {
    template: "card",
    title: "1930s-40s",
    body: `
<p><u>Great Depression</u>: The collapse of agricultural prices and massive unemployment hit Black workers especially hard because they were overrepresented in low-wage farm and service jobs and were often the last hired, first fired.</p>
<p><u>New Deal exclusions</u>: Many New Deal programs, including early Social Security and labor protections, excluded agricultural and domestic workers (jobs where Black Americans were overrepresented) limiting their access to unemployment insurance, pensions, and wage protections.</p>
<p><u>Postwar housing boom</u>: After World War II, federally backed mortgages fueled a massive suburban housing boom, becoming the main engine of middle-class wealth in America. However, redlining and discriminatory lending largely shut Black families out of these appreciating neighborhoods, widening the racial wealth gap.</p>
`
  },
  {
    template: "card",
    image: "assets/frame14.png",
    body: "During this time in our history: white wages sharp drop around 1929-1933 and gradual recovery late 1930s. Black wages steeper drop than white wages, slower recovery, gap widens.",
    wage: 1
  },
  {
    template: "card",
    image: "assets/frame15.png",
    body: "In our scenario: land is a shock absorber, families could grow food so less starvation and eviction vulnerability. Less severe drop in wage for black families and recovery begins slightly earlier.",
    wage: 1
  },
  {
    template: "card",
    image: "assets/frame16.png",
    body: `
Simulation Statistics:

<b>White Families</b>
<ul>
<li> Starting Acres: 230 </li>
<li> Loan Rate: 10%</li>
<li> Investment Exposure:</li>
</ul>
<b>Black Families</b>
<ul>
<li> Starting Acres: 40 </li>
<li> Loan Rate: 2%</li>
<li> Investment Exposure:</li> 
</ul>`, //TODO: add investment exposure stat
    wage: 1
  },
  {
    template: "card",
    title: "1950s-60s",
    body: `
<p><u>Emmett Louis Till</u>: (July 25, 1941 – August 28, 1955) was an African-American boy who, at 14 years old, was abducted and lynched in Mississippi in 1955 after being accused of offending a white woman. His lynching exposed the violent enforcement of white supremacy, reinforcing social and economic terror that restricted mobility, business development, and investment in Black communities.</p>

<p><u>Brown v. Board of Education (1954)</u>:Ruled school segregation unconstitutional, but implementation was slow and heavily resisted in the South, limiting immediate gains in education quality and long-term earnings for Black families.</p>
`
  },
  {
    template: "card",
    image: "assets/frame18.png",
    body: "During this time in our history: white wages steady upwards slope (postwar prosperity, manufacturing boom, suburbanization), black wages slower upward slope, small improvement but still clearly below white wages. Wealth gap widens because housing appreciation compounds white wealth faster than wages alone.",
    wage: 1
  },
  {
    template: "card",
    image: "assets/frame19.png",
    body: "In our scenario: black families have higher baseline wealth entering 1950 as land is passed down or leveraged for credit. Some families become farmers, landlords, small manufacturers. Better access to education & relocation land equity means college tuition or business startup capital.",
    wage: 1
  },
  {
    template: "card",
    image: "assets/frame20.png",
    body: `
Simulation Statistics:

<b>White Families</b>
<ul>
<li> Starting Acres: 230 </li>
<li> Loan Rate: 10%</li>
<li> Investment Exposure:</li>
</ul>
<b>Black Families</b>
<ul>
<li> Starting Acres: 40 </li>
<li> Loan Rate: 2%</li>
<li> Investment Exposure:</li> 
</ul>`, //TODO: add investment exposure stat
    wage: 1
  },
  {
    template: "card",
    title: "1970s-80s",
    body: `
<p><u>Manufacturing decline</u>: Factory jobs disappear, especially in urban areas where Black workers were concentrated.</p>

<p><u>Rise of financialization</u>:Economic growth shifts toward finance and services, favoring those with assets rather than wage-only income.</p>
`
  },
  {
    template: "card",
    image: "assets/frame22.png",
    body: "During this time in our history: Black wages decline more sharply due to industrial job loss, and unemployment lasts longer. The wage gap widens and wealth stagnates or declines in many communities.",
    wage: 1
  },
  {
    template: "card",
    image: "assets/frame23.png",
    body: "In our scenario: Families with diversified assets and inherited land equity are more resilient. The Black wage line dips but not as severely, and wealth continues compounding through alternative investments",
    wage: 1
  },
  {
    template: "card",
    title: "2000s",
    body: `
<p><u>Subprime lending disparities</u>:Black homeowners are disproportionately targeted with high-risk mortgages.</p>

<p><u>2008 Housing Crash</u>: Massive home equity losses hit Black households harder, erasing significant portions of accumulated wealth.
</p>
`
  },
  { title: "Frame 25", wage: 1 },
  { title: "Frame 26", wage: 1 },
  { title: "Frame 27", wage: 1 },
  { title: "Frame 28", wage: 1 },
  { title: "Frame 29", wage: 1 },
  { title: "Frame 30", wage: 1 },
  { title: "Frame 31", wage: 1 }
];
