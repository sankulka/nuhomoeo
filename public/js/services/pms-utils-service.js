var pms = angular.module('PMS');

pms.service('PMSUtilsService', function() {
	
	this.capitalize = function (str) {
		return str.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase();
		});
	}
	
	this.salutations = [
		'Mr',
		'Mrs',
		'Miss',
		'Master'
	];
	
	this.getSalutations = function(){
		return this.salutations;
	}
	
	this.references = [
		'Google',
		'Website',
		'Just Dial',
		'Practo',
		'Hoarding',
		'Others'
	];
	
	this.getReferences = function(){
		return this.references;
	}
	
	this.changes = [
		{name: 'Better', icon: 'fa fa-thumbs-o-up'},
		{name: 'Worse', icon: 'fa fa-thumbs-o-down'},
		{name: 'No Change', icon: 'fa fa-minus'},
		{name: 'Increase', icon: 'fa fa-chevron-up'},
		{name: 'Decrease', icon: 'fa fa-chevron-down'},
		{name: 'High', icon: 'fa fa-arrow-up'},
		{name: 'Low', icon: 'fa fa-arrow-down'},
		{name: 'Ameliorate', icon: 'fa fa-chevron-right'},
		{name: 'Aggravate', icon: 'fa fa-chevron-left'},
		{name: 'Erratic', icon: 'fa fa-bolt'},
		{name: 'Present', icon: 'fa fa-circle'},
		{name: 'Absent', icon: 'fa fa-ban'}
	];
	
	this.getChanges = function () {
		return this.changes;
	}
	
	this.getIconByName = function (name) {
		for (var ii = 0; ii < this.changes.length; ii++) {
			if (name == this.changes[ii].name)
				return this.changes[ii].icon;
		}
	}
	
	this.frequencies = [
		'Once a day',
		'Two times a day',
		'Three times a day',
		'Four times a day',
		'Every hour',
		'Every two hours',
		'Every three hours',
		'Every four hours'
	];
	
	this.getFrequencies = function () {
		return this.frequencies;
	}
	
	this.doses = [
		'1 Pill',
		'2 Pills',
		'3 Pills',
		'4 Pills'
	];
	
	this.getDoses = function () {
		return this.doses;
	}

	this.payMediums = [
		'Cash',
		'Card',
		'Cheque',
		'E-Wallet',
		'Online',
		'Other'
	];
	/*	{name: 'Bank', icon: ''},
		{name: 'Cash', icon: 'fa fa-rupee'},
		{name: 'Card', icon: 'fa fa-credit-card'},
		{name: 'E-Wallet', icon: ''},
		{name: 'Other', icon: ''}
	*/

	this.getPayMediums = function () {
		return this.payMediums;
	}
	
	this.apptQueries = [
		'Yesterday',
		'Today',
		'Tomorrow',
		'Last Week',
		'This Week',
		'Next Week'
	];
	
	this.getApptQueries = function () {
		return this.apptQueries;
	}
	
	this.potencies = [
		'6X',
		'12X',
		'30X',
		'200X',
		'1M',
		'10M',
		'50M'
	];
	
	this.getPotencies = function() {
		return this.potencies;
	}

	this.medicines = [];
		
	this.getMedicines = function () {
		return this.medicines;
	}
	
	this.medicines = [
		'Abies Canadensis',
		'Abies Nigra',
		'Abrotanum',
		'Absinthium',
		'Acacia Arabica',
		'Acalypha Indica',
		'Acetaldehyde',
		'Acetanilidum',
		'Aceticum Acidum',
		'Acetylsalicylicum Acidum',
		'Achyranthis Calea',
		'Aconite',
		'Aconitum Ferox',
		'Aconitum Lycoctonum',
		'Aconitum Napellus',
		'Aconitum',
		'Acorus Calamus',
		'Actaea Spicata Acrylate',
		'Actaea Rac',
		'Actaea Spic',
		'Adamas',
		'Adelheidsquelle',
		'Adenosinum Cyclophosphoricum',
		'Adeps Suillus',
		'Adipose Tissue',
		'Adonis Vernalis',
		'Adrenal Cortex',
		'Adrenal Gland',
		'Adrenalinum',
		'Adrenocorticotrophin',
		'Aesculinum',
		'Aesculus Carnea',
		'Aesculus Glabra',
		'Aesculus Hippocastanum',
		'Aethiops Antimonialis',
		'Aethiops Mercurialis-Mineralis',
		'Aethusa Cynapium',
		'Agaricinum',
		'Agaricus Campanulatus',
		'Agaricus Campestris',
		'Agaricus Citrinus',
		'Agaricus Emeticus',
		'Agaricus Muscarius',
		'Agaricus Pantherinus',
		'Agaricus Phalloides',
		'Agaricus Procerus',
		'Agaricus Semiglobatus',
		'Agaricus Stercorarius',
		'Agave Americana',
		'Agave Tequilana',
		'Agnus Castus',
		'Agraphis Nutans',
		'Agrimonia Eupatoria',
		'Agrimonia Odorata',
		'Agrostemma Githago',
		'Ailanthus Glandulosus',
		'Aletris Farinosa',
		'Alfalfa',
		'Alisma Plantago',
		'Allium Cepa',
		'Allium Sativum',
		'Alloxanum',
		'Alnus Glutinosa',
		'Alnus Serrulata',
		'Aloe Socotrina',
		'Alstonia Constricta',
		'Alstonia Scholaris',
		'Althaea Officinalis',
		'Alumen',
		'Alumina',
		'Alumina Silicata',
		'Aluminum Metallicum',
		'Aluminum Muriaticum',
		'Ambra Grisea',
		'Ambrosia Artemisiaefolia',
		'Ammi Visnaga',
		'Ammoniacum Gummi',
		'Ammonium Aceticum',
		'Ammonium Benzoicum',
		'Ammonium Bromatum',
		'Ammonium Carbonicum',
		'Ammonium Causticum',
		'Ammonium Citricum',
		'Ammonium Iodatum',
		'Ammonium Muriaticum',
		'Ammonium Nitricum',
		'Ammonium Phosphoricum',
		'Ammonium Picricum',
		'Ammonium Tartaricum',
		'Ammonium Valerianicum',
		'Ammonium Vanadium',
		'Amorphophallus Rivieri',
		'Ampelopsis Quinquefolia',
		'Amygdala Amara',
		'Amygdalae Amarae Aqua',
		'Amygdalae Amarae Oleum',
		'Amygdalus Persica',
		'Amyl Nitrosum',
		'Anacardium Occidentale',
		'Anacardium Orientale',
		'Anagallis Arvensis',
		'Ananassa',
		'Anas Barbariae Hepatis Et Cordis Extractum',
		'Anatherum Muricatum',
		'Anchusa Officinalis',
		'Anemone Nemorosa',
		'Anemopsis Californica',
		'Anethum Graveolens',
		'Angelica Archangelica',
		'Angelica Atropurpurea',
		'Angelica Sinensis',
		'Angophora Lanceolata',
		'Angustura Vera',
		'Anhalonium Lewinii',
		'Anilinum',
		'Anilinum Sulphuricum',
		'Anisum',
		'Anthemis Nobilis',
		'Anthemis Pyrethrum',
		'Anthoxanthum Odoratum',
		'Anthracinum',
		'Antimonium Arsenicicum',
		'Antimonium Crudum',
		'Antimonium Iodatum',
		'Antimonium Muriaticum',
		'Antimonium Oxydatum',
		'Antimonium Sulphuratum Aureum',
		'Antimonium Tartaricum',
		'Antipyrinum',
		'Apatite',
		'Apiolum',
		'Apis Mellifica',
		'Apis Venenum Purum',
		'Apium Graveolens',
		'Apocynum Androsaemifolium',
		'Apocynum Cannabinum',
		'Apomorphinum',
		'Apomorphinum Muriaticum',
		'Aqua Marina',
		'Aquilegia Vulgaris',
		'Aralia Hispida',
		'Aralia Quinquefolia',
		'Aralia Racemosa',
		'Aranea Diadema',
		'Arbutinum',
		'Arbutus Andrachne',
		'Areca Catechu',
		'Argemone Mexicana',
		'Argentum Cyanatum',
		'Argentum Iodatum',
		'Argentum Metallicum',
		'Argentum Muriaticum',
		'Argentum Nitricum',
		'Argentum Oxydatum',
		'Argentum Phosphoricum',
		'Aristolochia Clematitis',
		'Aristolochia Milhomens',
		'Aristolochia Serpentaria',
		'Arnica Montana',
		'Arsenicum Album',
		'Arsenicum Bromatum',
		'Arsenicum Iodatum',
		'Arsenicum Metallicum',
		'Arsenicum Sulphuratum Flavum',
		'Arsenicum Sulphuratum Rubrum',
		'Artemisia Vulgaris',
		'Arum Dracontium',
		'Arum Italicum',
		'Arum Maculatum',
		'Arum Triphyllum',
		'Arundo Mauritanica',
		'Asafoetida',
		'Asarum Canadense',
		'Asarum Europaeum',
		'Asclepias Curassavica',
		'Asclepias Incarnata',
		'Asclepias Syriaca',
		'Asclepias Tuberosa',
		'Asclepias Vincetoxicum',
		'Asclepias Vincetoxicum Folia',
		'Asimina Triloba',
		'Asparagus Officinalis',
		'Asperula Odorata',
		'Astacus Fluviatilis',
		'Asterias Rubens',
		'Astragalus Menziesii',
		'Atropinum',
		'Atropinum Sulphuricum',
		'Aurum Bromatum',
		'Aurum Iodatum',
		'Aurum Met',
		'Arum Mur',
		'Aurum Muriaticum Kalinatum',
		'Aurum Muriaticum Natronatum',
		'Aurum Sulphuratum',
		'Avena Sativa',
		'Aviaire',
		'Azadirachta Indica',
		'Bacillinum of Burnet',
		'Badiaga',
		'Baja',
		'Balsamum Peru',
		'Baptisia Tinctoria',
		'Barosma Cren',
		'Baryta Acetica',
		'Baryta Carbonica',
		'Baryta Iodata',
		'Baryta Muriatica',
		'BCG',
		'Belladonna',
		'Bellis Perennis',
		'Benzinum',
		'Benzinum Dinitricum',
		'Benzoicum Acidum',
		'Benzoinum',
		'Berberis Aquifolium',
		'Berberis Vulgaris',
		'Beryllium Metallicum',
		'Beta Vulgaris',
		'Betainum Muriaticum',
		'Betula Pendula',
		'Bismuthum Metallicum',
		'Bismuthum Oxydatum',
		'Bismuthum Subnitricum',
		'Bixa Orellana',
		'Blatta Americana',
		'Blatta Orientalis',
		'Boldo',
		'Boletus Luridus',
		'Boletus Satanas',
		'Bombyx Processionea',
		'Borago Officinalis',
		'Borax',
		'Boricum Acidum',
		'Botulinum',
		'Bovista',
		'Brassica Napus',
		'Bromelain',
		'Bromium',
		'Bromus Ramosus',
		'Brucinum',
		'Bryonia Alba',
		'Bufo Rana',
		'Bunias Orientalis',
		'Buthus Australis',
		'Butyricum Acidum',
		'Buxus Sempervirens',
		'Cacao',
		'Cactus Grandiflorus',
		'Cadmium Bromatum',
		'Cadmium Iodatum',
		'Cadmium Metallicum',
		'Cadmium Muriaticum',
		'Cadmium Sulphuratum',
		'Cadmium Sulphuricum',
		'Caffeinum',
		'Cahinca',
		'Cajuputum',
		'Caladium Seguinum',
		'Calcarea Acetica',
		'Calcarea Arsenicica',
		'Calcarea Carbonica',
		'Calcarea Caustica',
		'Calcarea Fluorica',
		'Calcarea Hypochlorata',
		'Calcarea Hypophosphorosa',
		'Calcarea Iodata',
		'Calcarea Lactica',
		'Calcarea Muriatica',
		'Calcarea Oxalica',
		'Calcarea Phosphorica',
		'Calcarea Picrata',
		'Calcarea Silicata',
		'Calcarea Sulphurica',
		'Calendula Officinalis',
		'Calluna Vulgaris',
		'Calotropis Gigantea',
		'Caltha Palustris',
		'Camphora',
		'Camphora Monobromata',
		'Camphoricum Acidum',
		'Canchalagua',
		'Candida Albicans',
		'Candida Parapsilosis',
		'Canine Dapp',
		'Cantharidinum',
		'Cantharis',
		'Capsicum',
		'Carbo Animalis',
		'Carbo Vegetabilis',
		'Carbolicum Acidum',
		'Carboneum',
		'Carboneum Chloratum',
		'Carboneum Hydrogenisatum',
		'Carboneum Oxygenisatum',
		'Carboneum Sulphuratum',
		'Carcinosinum',
		'Cardiospermum',
		'Carduus Benedictus',
		'Carduus Marianus',
		'Carpinus Betulus',
		'Cartilago Suis',
		'Carum Carvi',
		'Cascarilla',
		'Cassada',
		'Castanea Sativa',
		'Castanea Vesca',
		'Castor Equi',
		'Castoreum',
		'Catalpa Bignonioides',
		'Caulophyllum Thalictroides',
		'Causticum',
		'Ceanothus Americanus',
		'Cedron',
		'Celtis Occidentalis',
		'Cenchris Contortrix',
		'Centaurea Tagana',
		'Centaurium Umbellatum',
		'Cephalanthus Occidentalis',
		'Cerasus Virginiana',
		'Ceratostigma Willmottianum',
		'Cereus Bonplandii',
		'Cereus Serpentinus',
		'Cerium Oxalicum',
		'Cetraria Islandica',
		'Chamomilla',
		'Cheiranthus Cheiri',
		'Chelidonium Majus',
		'Chelone Glabra',
		'Chenopodii Glauci Aphis',
		'Chenopodium Anthelminticum',
		'Chenopodium Vulvaria',
		'Chimaphila Maculata',
		'Chimaphila Umbellata',
		'Chininum Arsenicicum',
		'Chininum Arsenicosum',
		'Chininum Muriaticum',
		'Chininum Purum',
		'Chininum Salicylicum',
		'Chininum Sulphuricum',
		'Chionanthus Virginica',
		'Chloralum',
		'Chloramphenicolum',
		'Chlorinum',
		'Chloroforum',
		'Chlorpromazinum',
		'Cholera',
		'Cholesterinum',
		'Cholinum',
		'Chromicum Acidum',
		'Chromium Kali Sulphuricum',
		'Chromium Oxydatum',
		'Chromium Sulphuricum',
		'Chrysanthemum Leucanthemum',
		'Chrysarobinum',
		'Cicer Arietinum',
		'Cichorium Intybus',
		'Cicuta Maculata',
		'Cicuta Virosa',
		'Cimex Lectularius',
		'Cimicifuga Racemosa',
		'Cina',
		'Cinchona Officinalis',
		'Cinchonium Sulphuricum',
		'Cineraria Maritima',
		'Cinnamomum',
		'Cistus Canadensis',
		'Citricum Acidum',
		'Citrus Decumana',
		'Citrus Limonum',
		'Citrus Vulgaris',
		'Clematis Erecta',
		'Clematis Virginiana',
		'Clematis Vitalba',
		'Cobaltum Metallicum',
		'Cobaltum Muriaticum',
		'Cobaltum Nitricum',
		'Coccinella Septempunctata',
		'Cocculus Indicus',
		'Coccus Cacti',
		'Cochlearia Armoracia',
		'Cochlearia Officinalis',
		'Coenzyme A',
		'Coffea Cruda',
		'Coffea Tosta',
		'Colchicinum',
		'Colchicum Autumnale',
		'Colibacillinum',
		'Collinsonia Canadensis',
		'Colocynthinum',
		'Colocynthis',
		'Colostrum',
		'Comocladia Dentata',
		'Conchiolinum',
		'Condurango',
		'Coniinum',
		'Coniinum Bromatum',
		'Conium Maculatum',
		'Convallaria Majalis',
		'Convolvulus Arvensis',
		'Copaiva Officinalis',
		'Corallium Rubrum',
		'Corallorhiza Odontorhiza',
		'Coriaria Ruscifolia',
		'Cornus Alternifolia',
		'Cornus Circinata',
		'Cornus Florida',
		'Cortisone Aceticum',
		'Corydalis Canadensis',
		'Cotyledon Umbilicus',
		'Coumarinum',
		'Crataegus Oxyacantha',
		'Cresolum',
		'Crocus Sativus',
		'Crotalus Cascavella',
		'Crotalus Horridus',
		'Croton Tiglium',
		'Crotonchloralum',
		'Cubeba Officinalis',
		'Cucurbita Citrullus',
		'Cucurbita Pepo',
		'Culex Musca',
		'Cuphea Petiolata',
		'Cupressus Australis',
		'Cupressus Lawsoniana',
		'Cuprum Aceticum',
		'Cuprum Ammonio-Sulphuricum',
		'Cuprum Arsenicosum',
		'Cuprum Carbonicum',
		'Cuprum Metallicum',
		'Cuprum Muriaticum',
		'Cuprum Nitricum',
		'Cuprum Oxydatum Nigrum',
		'Cuprum Sulphuricum',
		'Curare',
		'Cyclamen Europaeum',
		'Cydonia Vulgaris',
		'Cynara Scolymus',
		'Cynodon Dactylon',
		'Cypripedium Pubescens',
		'Cysteinum',
		'Cytisus Scoparius',
		'Damiana',
		'Daphne Indica',
		'Datura Arborea',
		'Datura Metel',
		'DDT',
		'Delphininum',
		'Derris Pinnata',
		'Dichapetalum',
		'Dictamnus Albus',
		'Digitalinum',
		'Digitalis Purpurea',
		'Digitoxinum',
		'Dioscorea Villosa',
		'Dioscoreinum',
		'Diphtherinum',
		'Diphtherotozinum',
		'Diptherinum',
		'Diptherotoxinum',
		'Dirca Palustris',
		'DNA',
		'Dolichos Pruriens',
		'Doryphora Decemlineata',
		'Draba Verna',
		'Drosera Rotundifolia',
		'Duboisia Myoporoides',
		'Dulcamara',
		'Dysentery',
		'Eberthinum',
		'Echinacea Angustifolia',
		'Echinacea Purpurea',
		'Elaeis Guineensis',
		'Elaps Corallinus',
		'Elaterium',
		'Embryo Suis',
		'Emetinum',
		'Enterotoccinum',
		'Eosinum Natrum',
		'Ephedra Vulgaris',
		'Epigaea Repens',
		'Epilobium Palustre',
		'Epiphegus Virginiana',
		'Equisetum Arvense',
		'Equisetum Hyemale',
		'Eranthis Hyemalis',
		'Erechtites Hieracifolia',
		'Erigeron Canadensis',
		'Eriodictyon Californicum',
		'Erodium',
		'Eryngium Aquaticum',
		'Eryngium Maritimum',
		'Erythraea Centaurium',
		'Eschscholtzia Californica',
		'Eserinum',
		'Etherum',
		'Ethylicum',
		'Ethylum Nitricum',
		'Eucalyptol',
		'Eucalyptus Globulus',
		'Eugenia Caryophyllata',
		'Eugenia Jambosa',
		'Euonymus Atropurpureus',
		'Euonymus Europaeus',
		'Eupatorium Aromaticum',
		'Eupatorium Cannabinum',
		'Eupatorium Perfoliatum',
		'Eupatorium Purpureum',
		'Euphorbia Amygdaloides',
		'Euphorbia Corollata',
		'Euphorbia Cyparissias',
		'Euphorbia Hypericifolia',
		'Euphorbia Lathyris',
		'Euphorbia Pilulifera',
		'Euphorbium Officinarum',
		'Euphrasia Officinalis',
		'Eupion',
		'Eyebright herb',
		'Fagopyrum Esculentum',
		'Fagus Sylvatica',
		'Fel Tauri',
		'Ferrum Aceticum',
		'Ferrum Arsenicicum',
		'Ferrum Bromatum',
		'Ferrum Carbonicum',
		'Ferrum Citricum',
		'Ferrum Cyanatum',
		'Ferrum Iodatum',
		'Ferrum Lacticum',
		'Ferrum Metallicum',
		'Ferrum Muriaticum',
		'Ferrum Pernitricum',
		'Ferrum Phosphoricum',
		'Ferrum Picricum',
		'Ferrum Sulphuricum',
		'Ferrum Tartaricum',
		'Ferula Glauca',
		'Ficus Religiosa',
		'Filix Mas',
		'Foeniculum Vulgare',
		'Folliculinum',
		'Formalinum',
		'Formica Rufa',
		'Formicum Acidum',
		'Fragaria Vesca',
		'Franciscea Uniflora',
		'Fraxinus Americana',
		'Fraxinus Excelsior',
		'Fuchsinum',
		'Fucus Vesiculosus',
		'Fumaria Officinalis',
		'Fumaricum Acidum',
		'Funiculus Umbilicalis Suis',
		'Galanthus Nivalis',
		'Galega Officinalis',
		'Galium Aparine',
		'Gallicum Acidum',
		'Galphimia Glauca',
		'Gambogia',
		'Garlic',
		'Gaultheria Procumbens',
		'Gelsemium Sempervirens',
		'Genista Tinctoria',
		'Gentiana Cruciata',
		'Gentiana Lutea',
		'Gentiana Quinqueflora',
		'Gentianella Amarella',
		'Geranium Maculatum',
		'Geranium Robertianum',
		'Geum Rivale',
		'Geum Urbanum',
		'Ginkgo Biloba',
		'Glandula Suprarenalis Suis',
		'Glechoma Hederacea',
		'Glonoinum',
		'Glycerinum',
		'Glycogenum',
		'Glycyrrhiza Glabra',
		'Gnaphalium Leontopodium',
		'Gnaphalium Polycephalum',
		'Gnaphalium Uliginosum',
		'Gonotoxinum',
		'Gossypium Herbaceum',
		'Granatum',
		'Graphites',
		'Gratiola Officinalis',
		'Grindelia',
		'Guaco',
		'Guaiacum',
		'Guarea Trichilioides',
		'Guatteria Gaumeri',
		'Gunpowder',
		'Gymnocladus Canadensis',
		'Haematoxylon Campechianum',
		'Haemophilus Infl',
		'Hair Bulb',
		'HamamelisVirginiana',
		'Haronga Madagas-cariensis',
		'Hedeoma Pulegioides',
		'Hedera Helix',
		'Hekla Lava',
		'Helianthemum Nummularium',
		'Helianthus Annuus',
		'Heliotropium Peruvianum',
		'Helix Tosta',
		'Helleborus Foetidus',
		'Helleborus Niger',
		'Helleborus Viridis',
		'Heloderma',
		'Helonias Dioica',
		'Hepar Suis',
		'Hepar Sulphuris Calcareum',
		'Hepar Sulphuris Kalinum',
		'Hepatica Triloba',
		'Hepatitis A',
		'Hepatitis B',
		'Hepatitis C',
		'Heracleum Sphondylium',
		'Herpes Zoster',
		'Hippozaeninum',
		'Hippuricum Acidum',
		'Hirudinum',
		'Histaminum Hydrochloricum',
		'Hoang-Nan',
		'Hoitzia Coccinea',
		'Holarrhena Antidysenterica',
		'Homarus',
		'Hottonia Palustris',
		'Humulus Lupulus',
		'Hura Brasiliensis',
		'Hura Crepitans',
		'Hydrangea Arborescens',
		'Hydrastininum Muriaticum',
		'Hydrastis Canadensis',
		'Hydrocotyle Asiatica',
		'Hydrocyanicum Acidum',
		'Hydrofluoricum Acidum',
		'Hydrophis Cyanocinctus',
		'Hydrophyllum Virginianum',
		'Hyoscyaminum',
		'Hydrobromatum',
		'Hyoscyamus Niger',
		'Hypericum Perforatum',
		'Hypothalamus',
		'Iberis Amara',
		'Ichthyolum',
		'Ignatia Amara',
		'Ilex Aquifolium',
		'Ilex Paraguariensis',
		'Illicium Anisatum',
		'Impatiens Glandulifera',
		'Imperatoria Ostruthium',
		'Indigo',
		'Indium Metallicum',
		'Indolum',
		'Influenzinum',
		'Inula Helenium',
		'Iodium',
		'Iodoformum',
		'Ipecacuanha',
		'Ipomoea Stans',
		'Iridium Metallicum',
		'Iris Florentina',
		'Iris Foetidissima',
		'Iris Germanica',
		'Iris Tenax',
		'Iris Versicolor',
		'Jacaranda Caroba',
		'Jalapa',
		'Jasminum Officinale',
		'Jasper',
		'Jatropha Curcas',
		'Jatropha Urens',
		'Jequirity',
		'Jonesia Asoca',
		'Juglans Cinerea',
		'Juglans Regia',
		'Juncus Effusus',
		'Juniperus Communis',
		'Juniperus Virginiana',
		'Justicia Adhatoda',
		'Kali Aceticum',
		'Kali Arsenicosum',
		'Kali Bichromicum',
		'Kali Bromatum',
		'Kali Carbonicum',
		'Kali Causticum',
		'Kali Chloricum',
		'Kali Chromicum',
		'Kali Cyanatum',
		'Kali Ferrocyanatum',
		'Kali Iodatum',
		'Kali Muriaticum',
		'Kali Nitricum',
		'Kali Oxalicum',
		'Kali Permanganicum',
		'Kali Phosphoricum',
		'Kali Picricum',
		'Kali Silicatum',
		'Kali Sulphuricum',
		'Kali Tartaricum',
		'Kali Telluricum',
		'Kalmia Latifolia',
		'Kamala',
		'Karaka',
		'Karwinskia Humboldtiana',
		'Kino Australiensis',
		'Kousso',
		'Kreosotum',
		'Laburnum Anagyroides',
		'Lac Caninum',
		'Lac Defloratum',
		'Lac Felinum',
		'Lac Maternum',
		'Lac Vaccinum',
		'Lacerta Agilis',
		'Lachesis Mutus',
		'Lachnanthes Tinctoria',
		'Lacticum Acidum',
		'Lactuca Virosa',
		'Lamium Album',
		'Lapis Albus',
		'Lappa Major',
		'Larix Decidua',
		'Lathyrus Cicera',
		'Lathyrus Sativus',
		'Latrodectus Katipo',
		'Latrodectus Mactans',
		'Laurocerasus',
		'Lecithin granules',
		'Lecithin potenized',
		'Ledum Palustre',
		'Lemna Minor',
		'Leonurus Cardiaca',
		'Lepidium Bonariense',
		'Leptandra Virginica',
		'Lespedeza Capitata',
		'Levico',
		'Levisticum Officinale',
		'Levomepromazinum',
		'Liatris Spicata',
		'Lilium Tigrinum',
		'Limulus',
		'Linaria Vulgaris',
		'Linum Catharticum',
		'Linum Usitatissimum',
		'Lithium Benzoicum',
		'Lithium Bromatum',
		'Lithium Carbonicum',
		'Lithium Muriaticum',
		'Lobelia Cardinalis',
		'Lobelia Erinus',
		'Lobelia Inflata',
		'Lobelia Purpurescens',
		'Lobelia Syphilitica',
		'Lobelinum',
		'Lolium Temulentum',
		'Lonicera Caprifolium',
		'Lonicera Periclymenum',
		'Lonicera Xylosteum',
		'Lophophytum Leandri',
		'Luesinum',
		'Luffa Operculata',
		'Lupulinum',
		'Lycopersicum Esculentum',
		'Lycopodium Clavatum',
		'Lycopus Virginicus',
		'Lysimachia Nummularia',
		'Lyssin',
		'Lyssinum',
		'Macrotinum',
		'Magnesia Carbonica',
		'Magnesia Muriatica',
		'Magnesia Oxydata',
		'Magnesia Phosphorica',
		'Magnesia Sulphurica',
		'Magnesium Metallicum',
		'Magnolia Glauca',
		'Magnolia Grandiflora',
		'Malaria Off.',
		'Malus Pumila',
		'Mancinella',
		'Mandragora Officinarum',
		'Manganum Aceticum',
		'Manganum Carbonicum',
		'Manganum Metallicum',
		'Manganum Muriaticum',
		'Manganum Oxydatum Nativum',
		'Manganum Oxydatum Nigrum',
		'Manganum Phosphoricum',
		'Manganum Sulphuricum',
		'Mangifera Indica',
		'Marrubium Vulgare',
		'Matico',
		'Matthiola Graeca',
		'Medorrhinum(Gonorrheal virus)',
		'Medulla Ossis Suis',
		'Medusa',
		'Melastoma Ackermani',
		'Melilotus Alba',
		'Melilotus Officinalis',
		'Melissa Officinalis',
		'Menispermum Canadense',
		'Mentha Piperita',
		'Mentha Pulegium',
		'Mentha Viridis',
		'Mentholum',
		'Menyanthes Trifoliata',
		'Mephitis Mephitica',
		'Mercurialis Perennis',
		'Mercurius Aceticus',
		'Mercurius Auratus',
		'Mercurius Bromatus',
		'Mercurius Corrosivus',
		'Mercurius Cum Kali Iodatus',
		'Mercurius Cyanatus',
		'Mercurius Dulcis',
		'Mercurius Iodatus Flavus',
		'Mercurius Iodatus Ruber',
		'Mercurius Methylenus',
		'Mercurius Nitricus',
		'Mercurius Praecipitatus Albus',
		'Mercurius Praecipitatus Ruber',
		'Mercurius Solubilis',
		'Mercurius Sulphocyanatus',
		'Mercurius Sulphuratus Ruber',
		'Mercurius Sulphuricus',
		'Mercurius Vivus',
		'Methylene Blue',
		'Mezereum',
		'Millefolium',
		'Mimosa Pudica',
		'Mimulus Guttatus',
		'Mitchella Repens',
		'Momordica Balsamina',
		'Mononucleosis',
		'Monotropa Uniflora',
		'Morbillinum(Measles)',
		'Moschus',
		'Mucosa Nasalis Suis',
		'Mullein Essence',
		'Murex Purpurea',
		'Muriaticum Acidum',
		'Musa Sapientum',
		'Mygale',
		'Myosotis Arvensis',
		'Myrica Cerifera',
		'Myristica Sebifera',
		'Myrrha',
		'Myrtus Communis',
		'Nabalus Serpentarius',
		'Nadidum',
		'Naja Tripudians',
		'Naphthalinum',
		'Narceinum',
		'Narcissus, Pseudo',
		'Narcissus',
		'Narcotinum',
		'Nasturtium Aquaticum',
		'Natrum Arsenicicum',
		'Natrum Bicarbonicum',
		'Natrum Bromatum',
		'Natrum Carbonicum',
		'Natrum Fluoratum',
		'Natrum Hypochlorosum',
		'Natrum Lacticum',
		'Natrum Muriaticum',
		'Natrum Nitricum',
		'Natrum Nitrosum',
		'Natrum Oxalaceticum',
		'Natrum Phosphoricum',
		'Natrum Pyruvicum',
		'Natrum Salicylicum',
		'Natrum Silicofluoricum',
		'Natrum Sulphuratum',
		'Natrum Sulphuricum',
		'Natrum Sulphurosum',
		'Negundo',
		'Nepenthes',
		'Nepeta Cataria',
		'Niccolum Carbonicum',
		'Niccolum Metallicum',
		'Niccolum Sulphuricum',
		'Nicotinamidum',
		'Nicotinum',
		'Nitri Spiritus Dulcis',
		'Nitricum Acidum',
		'Nitrogenum Oxygenatum',
		'Nitromuriaticum Acidum',
		'Nosode Kit ',
		'Nosode-Select your own',
		'Nuclear Radiation',
		'Nuphar Luteum',
		'Nux Moschata',
		'Nux Vomica',
		'Nymphaea Odorata',
		'Ocimum Basilicum',
		'Ocimum Canum',
		'Ocimum Sanctum',
		'Oenanthe Crocata',
		'Oenothera Biennis',
		'Olea Europaea',
		'Oleander',
		'Oleum Animale',
		'Oleum Carvi',
		'Oleum Morrhuae',
		'Oleum Ricini',
		'Oleum Santali',
		'Olibanum',
		'Oniscus',
		'Ononis Spinosa',
		'Onopordum',
		'Onosmodium Virginianum',
		'Oophorinum',
		'Opuntia Vulgaris',
		'Orchitinum',
		'Oreodaphne Californica',
		'Origanum Majorana',
		'Ornithogalum Umbellatum',
		'Oroticum Acidum',
		'Oscillococcinum',
		'Osmium Metallicum',
		'Ostrya',
		'Ova Tosta',
		'Ovi Gallinae Pellicula',
		'Oxalicum Acidum',
		'Oxalis Acetosella',
		'Oxydendrum Arboreum',
		'Oxytropis Lambertii',
		'Paeonia Officinalis',
		'Palladium Metallicum',
		'Paloondo',
		'Pancreas Suis',
		'Pancreatinum',
		'Paraffinum',
		'Parathormonum',
		'Parathyroid',
		'Paratyphoidinum B',
		'Pareira Brava',
		'Parietaria Officinalis',
		'Paris Quadrifolia',
		'Paronichia Illecebrum',
		'Parotidinum(Mumps)',
		'Parthenium',
		'Passiflora Incarnata',
		'Pastinaca Sativa',
		'Paullinia Pinnata',
		'Paullinia Sorbilis',
		'Pecten',
		'Pediculus Capitis',
		'Penicillinum',
		'Penthorum Sedoides',
		'Pepsinum',
		'Perhexilinum',
		'Persea Americana',
		'Pertussinum(Whooping Cough)',
		'Petiveria Tetrandra',
		'Petroleum',
		'Petroselinum Sativum',
		'Phallus Impudicus',
		'Phaseolus',
		'Phellandrium Aquaticum',
		'Phenacetinum',
		'Phenobarbitalum',
		'Phloridzinum',
		'Phosphoricum Acidum',
		'Phosphorus',
		'Physalis Alkekenge',
		'Physotigma Venenosum',
		'Phytolacca Decandra',
		'Pichi',
		'Picricum Acidum',
		'Picrotoxinum',
		'Pilocarpinum',
		'Pilocarpinum Muriaticum',
		'Pilocarpinum Nitricum',
		'Pilocarpus',
		'Pimenta Officinalis',
		'Pimpinella Saxifraga',
		'Pinus Lambertiana',
		'Pinus Sylvestris',
		'Piper Methysticum',
		'Piper Nigrum',
		'Piperazinum',
		'Piscidia Erythrina',
		'Pituitarum Posterium',
		'Pix Liquida',
		'Placenta Totalis Suis',
		'Plague',
		'Plantago Major',
		'Platanus',
		'Platinum Metallicum',
		'Platinum Muriaticum',
		'Plectranthus Fruticosus',
		'Plumbago Littoralis',
		'Plumbum Aceticum',
		'Plumbum Carbonicum',
		'Plumbum Chromicum',
		'Plumbum Iodatum',
		'Plumbum Metallicum',
		'Pneumococcinum',
		'Podophyllinum',
		'Podophyllum Peltatum',
		'Polio',
		'Polygonum Punctatum',
		'Polygonum Sagittatum',
		'Polyporus Officinalis',
		'Polyporus Pinicola',
		'Populus Candicans',
		'Populus Tremula',
		'Populus Tremuloides',
		'Potentilla Anserina',
		'Pothos Foetidus',
		'Primula Obconica',
		'Primula Veris',
		'Primula Vulgaris',
		'Proteus Bulgaris',
		'Proteus Vulgaris',
		'Prunus Cerasifera',
		'Prunus Padus',
		'Prunus Spinosa',
		'Prunus Virginiana',
		'Psorinum',
		'Ptelea Trifoliata',
		'Pulex Irritans',
		'Pulsatilla Niger',
		'Pulsatilla Nuttalliana',
		'Pyrethrum Parthenium',
		'Pyridoxinum Hydrochloricum',
		'Pyrogenium-sepsis',
		'Pyrus Americana',
		'Quassia Amara',
		'Quebracho',
		'Quercus Glandium Spiritus',
		'Quercus Robur',
		'Quillaja Saponaria',
		'Radium Bromatum',
		'Ranunculus Acris',
		'Ranunculus Bulbosus',
		'Ranunculus Ficaria',
		'Ranunculus Glacialis',
		'Ranunculus Repens',
		'Ranunculus Sceleratus',
		'Raphanus Sativus',
		'Ratanhia',
		'Rauwolfia Serpentina',
		'Reserpinum',
		'Resina Laricis',
		'Resorcinum',
		'Rhamnus Californica',
		'Rhamnus Cathartica',
		'Rhamnus Frangula',
		'Rhamnus Purshiana',
		'Rheum Officinale',
		'Rhodium Metallicum',
		'Rhododendron Chrysanthum',
		'Rhus Aromatica',
		'Rhus Diversiloba',
		'Rhus Glabra',
		'Rhus Toxicodendron',
		'Rhus Venenata',
		'Riboflavinum',
		'Ricinus Communis',
		'RNA',
		'Robinia Pseudoacacia',
		'Rock Water',
		'Rosa Canina',
		'Rosa Damascena',
		'Rosmarinus Officinalis',
		'Rubella',
		'Rubia Tinctorum',
		'Rumex Acetosa',
		'Rumex Crispus',
		'Rumex Obtusifolius',
		'Russula Foetens',
		'Ruta Graveolens',
		'Sabidilla',
		'Sabal Serrulata',
		'Sabina',
		'Saccharinum',
		'Saccharum Lactis',
		'Saccharum Officinale',
		'Salicinum',
		'Salicylicum Acidum',
		'Salix Alba',
		'Salix Nigra',
		'Salix Purpurea',
		'Salix Vitellina, Flos',
		'Salmonella',
		'Salol',
		'Salvia Officinalis',
		'Samarskite',
		'Sambucus Canadensis',
		'Sambucus Nigra',
		'Sanguinaria Canadensis',
		'Sanguinarinum Nitricum',
		'Sanicula',
		'Santoninum',
		'Saponaria Officinalis',
		'Saponinum',
		'Sarcode-Select your own organ remedy',
		'Sarcolacticum Acidum',
		'Sarracenia Purpurea',
		'Sarsaparilla',
		'Sassafras Officinale',
		'Scammonium',
		'Scarlatinum',
		'Secale-Ergot Schinus Molle',
		'Scilla Maritima',
		'Scleranthus Annuus, Flos',
		'Scolopendra',
		'Scolopendrium Vulgare',
		'Scopolaminum Hydrobromidum',
		'Scrophularia Nodosa',
		'Scutellaria Lateriflora',
		'Secale Cornutum',
		'Secale -Ergot',
		'Sedum Acre',
		'Selenium Metallicum',
		'Sempervivum Tectorum',
		'Senecio Aureus',
		'Senecio Jacobaea',
		'Senega Officinalis',
		'Senna',
		'Sepia',
		'Serum Anguillae',
		'Serum Anticolibacillaire',
		'Serum De Yersin',
		'Serum Equi',
		'Shigella',
		'Silica Marina',
		'Silicea',
		'Silphium Laciniatum',
		'Sinapis Alba',
		'Sinapis Arvensis, Flos',
		'Sinapis Nigra',
		'Sinusitisinum',
		'Sium Latifolium',
		'Skatolum',
		'Skookum Chuck',
		'Slag',
		'Solaninum',
		'Solanum Arrebenta',
		'Solanum Carolinense',
		'Solanum Mammosum',
		'Solanum Nigrum',
		'Solanum Oleraceum',
		'Solanum Tuberosum',
		'Solidago Virgaurea',
		'Sparteinum Sulphuricum',
		'Spigelia Anthelmia',
		'Spigelia Marilandica',
		'Spilanthes Oleracea',
		'Spinacia',
		'Spiraea Ulmaria',
		'Spiranthes Autumnalis',
		'Spongia Encephalitis',
		'Spongia Tosta',
		'Stachys Betonica',
		'Stannum Iodatum',
		'Stannum Metallicum',
		'Staphyloccoccus Aureus',
		'Staphylococcinum',
		'Staphylotoxinum',
		'Staphysagria',
		'Stellaria Media',
		'Sterculia Acuminata',
		'Stibium Metallicum',
		'Sticta Pulmonaria',
		'Stigmata Maidis',
		'Stillingia Sylvatica',
		'Stramonium',
		'Streptococcinum',
		'Strontium Bromatum',
		'Strontium Carbonicum',
		'Strontium Nitricum',
		'Strophanthus Hispidus',
		'Strophanthus Sarmentosus',
		'Strychninum',
		'Strychinum Arsenicicum',
		'Strychinum Nitricum',
		'Strychninum Phosphoricum',
		'Strychninum Sulphuricum',
		'Succinicum Acidum',
		'Succinum',
		'Sulphanilamidum',
		'Sulphonalum',
		'Sulphur',
		'Sulphur Hydrogenisatum',
		'Sulphur Iodatum',
		'Sulphuricum Acidum',
		'Sulphurosum Acidum',
		'Sumbul',
		'Symphoricarpus Racemosus',
		'Symphytum Officinale',
		'Syphilinum(Luesinum)',
		'Syzygium Jambolanum',
		'Tabacum',
		'Tamus Communis',
		'Tanacetum Vulgare',
		'Tanghinia Venenifera',
		'Tannicum Acidum',
		'Taraxacum Officinale',
		'Taraxacum Officinale, Radix',
		'Tarentula Cubensis',
		'Tarentula Hispana',
		'Tartaricum Acidum',
		'Taxus Baccata',
		'Tellurium Metallicum',
		'Teplitz',
		'Terebinthina',
		'Tetanotoxinum',
		'Tetradymite',
		'Teucrium Marum',
		'Teucrium Scorodonia',
		'Thallium Metallicum',
		'Thaspium Aureum',
		'Thea Sinensis',
		'Theobrominum',
		'Theridion',
		'Thiaminum Hydrochloricum',
		'Thioproperazinum',
		'Thiosinaminum',
		'Thlaspi Bursa-Pastoris',
		'Thuja Lobbi',
		'Thuja Occidentalis',
		'Thymolum',
		'Thymus Serpyllum',
		'Thyroidinum',
		'Tilia Europaea',
		'Titanium Metallicum',
		'Tongo',
		'Tormentilla',
		'Torula Cerevisiae',
		'Toxicophis Pugnax',
		'Tradescantia Diuretica',
		'Tribulus Terrestris',
		'Trifolium Pratense',
		'Trifolium Repens',
		'Trillium Pendulum',
		'Trimethylaminum',
		'Triosteum Perfoliatum',
		'Triticum Repens',
		'Tropaeolum Majus',
		'Tuberculinum',
		'Tuberculinum Residuum',
		'Tussilago Farfara',
		'Tussilago Fragrans',
		'Tussilago Petasites',
		'Typhoidinum',
		'Ulex Europaeus, Flos',
		'Ulmus Fulva',
		'Ulmus Procera, Flos',
		'Upas Tieute',
		'Uranium Nitricum',
		'Urea',
		'Uricum Acidum',
		'Urtica Crenulata',
		'Urtica Dioica',
		'Urtica Urens',
		'Usnea Barbata',
		'Ustilago Maidis',
		'Uva-Ursi herb',
		'Uva-Ursi',
		'V.A.B. -BCG',
		'Vaccinium Myrtillus',
		'Vaccinotoxinum',
		'Valeriana Officinalis',
		'Vanadium Metallicum',
		'Varicella enus Mercenaria(Chicken Pox)',
		'Variolinum(Smallpox)',
		'Veratrinum',
		'Veratrum Album',
		'Veratrum Nigrum',
		'Veratrum Viride',
		'Verbascum Thapsus',
		'Verbena Hastata',
		'Verbena Officinalis',
		'Verbena Officinalis, Flos',
		'Veronica Beccabunga',
		'Veronica Officinalis',
		'Vesicaria',
		'Vespa Crabro',
		'Viburnum Opulus',
		'Viburnum Prunifolium',
		'Vinca Minor',
		'Viloa Odorata',
		'Viola Tricolor',
		'Vipera Berus',
		'Viscum Album',
		'Vitamin B12',
		'Vitamin K',
		'Vitis Vinifera, Flos',
		'Wiesbaden',
		'Wyethia Helenioides',
		'X-Ray',
		'Xanthoxylum Fraxineum',
		'Xerophyllum Asphodeloides',
		'Yohimbinum',
		'Yucca Filamentosa',
		'Zincum Aceticum',
		'Zincum Bromatum',
		'Zincum Carbonicum',
		'Zincum Cyanatum',
		'Zincum Gluconicum',
		'Zincum Iodatum',
		'Zincum Metallicum',
		'Zincum Muriaticum',
		'Zincum Oxydatum',
		'Zincum Phosphoratum',
		'Zincum Picricum',
		'Zincum Sulphuricum',
		'Zincum Valerianicum',
		'Zingiber Officinale'
	];
});