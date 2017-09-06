import Estate from '../models/estate';

const getEstates = (req, res) => {
	Estate.find(null, null, { sort: { postDate : 1 } }, (err, estates) => {
		if (err) {
			res.send(err);
		}
		res.json(estates);
	});
}

const getEstate = (req, res) => {
	const { id } = req.params;
	Estate.findById(id, (err, estate) => {
		if (err) {
			res.send(err);
		}
		res.json(estate);
	});
}

const postEstate = (req, res) => {
  let estate = Object.assign(new Estate(), req.body);
  estate.save(err => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Estate successfully created!' });
  });
};

const deleteEstate = (req, res) => {
  Estate.remove(
    { _id: req.params.id },
    err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Estate successfully deleted!' });
    }
  );
};

export {
	getEstates,
	getEstate,
  postEstate,
  deleteEstate
};
